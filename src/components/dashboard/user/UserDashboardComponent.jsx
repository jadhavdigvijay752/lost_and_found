import React, { useState, useMemo } from "react";
import { useItemsMutation } from "../../../hooks/useItemsMutation";
import { useAuth } from "../../../hooks/useAuth";
import {
  Container,
  Typography,
  TextField,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Fab,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import StepperComponent from "./StepperComponent";
import ItemCardComponent from "./ItemCardComponent";
import AddItemDialog from "./AddItemDialogComponent";
import UserLayoutComponent from "../../layout/UserLayout";

/**
 * Component for displaying and managing user dashboard items.
 * @returns {JSX.Element} The rendered UserDashboardComponent
 */
function UserDashboardComponent() {
  const { useItemsQuery, addItemUsers } = useItemsMutation();
  const { data: items = [], isLoading, error } = useItemsQuery();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    foundLocation: "",
    dropOffLocation: "",
    color: "",
    size: "",
    foundDate: "",
    image: null,
  });

  /**
   * Filters and sorts items based on search term and user claims.
   * @returns {Array} Filtered and sorted list of items.
   */
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        console.log(item);
        const isClaimedByCurrentUser =
          Array.isArray(item.claimedBy) &&
          item.claimedBy.includes(user?.displayName || user?.email);

        const searchFields = [
          item.name,
          item.description,
          item.color,
          item.foundLocation,
          item.dropOffLocation,
        ];

        const matchesSearch = searchFields.some(
          (field) =>
            field && field.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return !item.isVerified && matchesSearch;
      })
      .sort((a, b) => {
        // Sort by createdAt timestamp, most recent first
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
  }, [items, searchTerm, user]);

  /**
   * Handles changes to the search input field.
   * @param {Object} event - The event object from the input field.
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Logs out the current user and displays a snackbar message.
   */
  const handleLogout = async () => {
    try {
      await logout();
      setSnackbar({
        open: true,
        message: "Logged out successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      setSnackbar({
        open: true,
        message: "Error logging out: " + error.message,
        severity: "error",
      });
    }
  };

  /**
   * Adds a new item for the user and displays a snackbar message.
   */
  const handleaddItemUsers = async () => {
    const formData = new FormData();
    Object.keys(newItem).forEach((key) => {
      if (key === "image" && newItem[key]) {
        formData.append(key, newItem[key]);
      } else {
        formData.append(key, newItem[key]);
      }
    });

    try {
      await addItemUsers(formData);
      setSnackbar({
        open: true,
        message: "Item added successfully",
        severity: "success",
      });
      setIsAddDialogOpen(false);
      setNewItem({
        name: "",
        description: "",
        foundLocation: "",
        dropOffLocation: "",
        color: "",
        size: "",
        foundDate: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding item:", error);
      setSnackbar({
        open: true,
        message: "Error adding item: " + error.message,
        severity: "error",
      });
    }
  };

  /**
   * Handles changes to the image input field.
   * @param {Object} event - The event object from the input field.
   */
  const handleImageChange = (event) => {
    setNewItem({ ...newItem, image: event.target.files[0] });
  };

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <UserLayoutComponent user={user} handleLogout={handleLogout}>
      <Container
        maxWidth="lg"
        sx={{ py: 8, position: "relative", backgroundColor: "#e7e2ff" }}
      >
        <StepperComponent />

        <Typography variant="h3" component="h1" gutterBottom>
          Found Items
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {filteredItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No items found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <ItemCardComponent
                  item={item}
                  user={user}
                  setSnackbar={setSnackbar}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", bottom: 20, right: 20 }}
          onClick={() => setIsAddDialogOpen(true)}
        >
          <AddIcon />
        </Fab>
        <AddItemDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleaddItemUsers}
          handleImageChange={handleImageChange}
        />
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </UserLayoutComponent>
  );
}

export default UserDashboardComponent;
