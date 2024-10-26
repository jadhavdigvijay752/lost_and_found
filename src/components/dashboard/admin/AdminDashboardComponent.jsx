import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { useItemsMutation } from "../../../hooks/useItemsMutation";
import AdminLayout from "../../layout/AdminLayout";
import ItemTableComponent from "./ItemTableComponent";

/**
 * AdminDashboardComponent is a React component that renders the admin dashboard.
 * It uses a theme provider and displays a table of items with options to add, update, or delete items.
 * It also shows a loading spinner while data is being fetched and a snackbar for notifications.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function AdminDashboardComponent() {
  const { useItemsQuery, addItem, updateItem, deleteItem } = useItemsMutation();
  const { data: items = [], isLoading, isFetching } = useItemsQuery();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const theme = createTheme();

  return (
    <AdminLayout>
      <ThemeProvider theme={theme}>
        <div
          style={{
            padding: "20px",
            maxWidth: "95vw",
            overflow: "auto",
            margin: "0 auto",
          }}
        >
          {isLoading || isFetching ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <ItemTableComponent
              items={items}
              addItem={addItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          )}
        </div>
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
      </ThemeProvider>
    </AdminLayout>
  );
}

export default AdminDashboardComponent;
