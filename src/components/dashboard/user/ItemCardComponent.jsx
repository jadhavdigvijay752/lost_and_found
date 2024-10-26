import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardActionArea,
  IconButton,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import StraightenIcon from "@mui/icons-material/Straighten";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ImageIcon from "@mui/icons-material/Image";
import { useItemsMutation } from "../../../hooks/useItemsMutation";
import { formatDate } from "../../../utilities/CommanFunctions";

/**
 * ItemCardComponent is a React component that displays an item card with details and actions.
 * It allows users to claim or unclaim items and view item images in a dialog.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.item - The item data to display.
 * @param {Object} props.user - The current user data.
 * @param {Function} props.setSnackbar - Function to set the snackbar state.
 * @param {Object} props.snackbar - The snackbar state.
 * @returns {JSX.Element} The rendered ItemCardComponent.
 */
function ItemCardComponent({ item, user, setSnackbar, snackbar }) {
  const { useItemsQuery, claimItem, unclaimItem } = useItemsMutation();
  const [fullImageDialog, setFullImageDialog] = useState({
    open: false,
    imageUrl: "",
    itemName: "",
  });
  const { data: items = [] } = useItemsQuery();
  const isClaimedByCurrentUser =
    Array.isArray(item.claimedBy) &&
    item.claimedBy.includes(user?.displayName || user?.email);

  /**
   * Renders the action button for claiming or unclaiming the item.
   *
   * @returns {JSX.Element} The action button.
   */
  const renderActionButton = () => {
    if (isClaimedByCurrentUser) {
      return (
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => handleUnclaim(item.id)}
          fullWidth
        >
          Unclaim
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleClaim(item.id)}
          fullWidth
        >
          Claim
        </Button>
      );
    }
  };

  /**
   * Handles claiming an item.
   *
   * @async
   * @function
   * @param {string} itemId - The ID of the item to claim.
   * @returns {Promise<void>}
   */
  const handleClaim = async (itemId) => {
    if (user && (user.displayName || user.email)) {
      try {
        const username = user.displayName || user.email;
        const item = items.find((item) => item.id === itemId);
        const currentClaimedBy = Array.isArray(item.claimedBy)
          ? item.claimedBy
          : [];

        if (!currentClaimedBy.includes(username)) {
          await claimItem({ itemId, username, currentClaimedBy });
          setSnackbar({
            open: true,
            message: "Item claimed successfully",
            severity: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: "You have already claimed this item",
            severity: "warning",
          });
        }
      } catch (error) {
        console.error("Error claiming item:", error);
        setSnackbar({
          open: true,
          message: "Error claiming item: " + error.message,
          severity: "error",
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: "You must be logged in to claim items",
        severity: "warning",
      });
    }
  };

  /**
   * Handles unclaiming an item.
   *
   * @async
   * @function
   * @param {string} itemId - The ID of the item to unclaim.
   * @returns {Promise<void>}
   */
  const handleUnclaim = async (itemId) => {
    if (user && (user.displayName || user.email)) {
      try {
        const username = user.displayName || user.email;
        const item = items.find((item) => item.id === itemId);
        const currentClaimedBy = Array.isArray(item.claimedBy)
          ? item.claimedBy
          : [];

        if (currentClaimedBy.includes(username)) {
          await unclaimItem({ itemId, username, currentClaimedBy });
          setSnackbar({
            open: true,
            message: "Item unclaimed successfully",
            severity: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: "You have not claimed this item",
            severity: "warning",
          });
        }
      } catch (error) {
        console.error("Error unclaiming item:", error);
        setSnackbar({
          open: true,
          message: "Error unclaiming item: " + error.message,
          severity: "error",
        });
      }
    }
  };

  /**
   * Handles opening the full image dialog.
   *
   * @param {string} imageUrl - The URL of the image to display.
   * @param {string} itemName - The name of the item.
   */
  const handleImageClick = (imageUrl, itemName) => {
    setFullImageDialog({
      open: true,
      imageUrl,
      itemName,
    });
  };

  /**
   * Handles closing the full image dialog.
   */
  const handleCloseFullImageDialog = () => {
    setFullImageDialog({
      open: false,
      imageUrl: "",
      itemName: "",
    });
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            component="div"
            sx={{
              height: 180,
              backgroundColor: "grey.200",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              "&:hover .zoom-overlay": {
                opacity: 1,
              },
            }}
            onClick={() => handleImageClick(item.imageUrl, item.name)}
          >
            {item.imageUrl ? (
              <>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <Box
                  className="zoom-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <FullscreenIcon
                    sx={{
                      color: "white",
                      fontSize: 40,
                    }}
                  />
                </Box>
              </>
            ) : (
              <ImageIcon
                sx={{
                  fontSize: 60,
                  color: "grey.400",
                }}
              />
            )}
          </CardMedia>
          <CardContent sx={{ flexGrow: 1, height: 320 }}>
            <Typography gutterBottom variant="h6" component="h2" noWrap>
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                height: "2.5em",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.description}
            </Typography>
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <ColorLensIcon
                sx={{
                  color: "error.main",
                  mr: 1,
                  fontSize: 20,
                }}
              />
              <Typography variant="body2" color="text.primary" noWrap>
                Color: {item.color || "Not specified"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <StraightenIcon
                sx={{ color: "info.main", mr: 1, fontSize: 20 }}
              />
              <Typography variant="body2" color="text.primary" noWrap>
                Size: {item.size || "Not specified"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <LocationOnIcon
                sx={{
                  color: "primary.main",
                  mr: 1,
                  fontSize: 20,
                }}
              />
              <Typography variant="body2" color="text.primary" noWrap>
                Location Found: {item.foundLocation || "Not specified"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <LocationOnIcon
                sx={{
                  color: "secondary.main",
                  mr: 1,
                  fontSize: 20,
                }}
              />
              <Typography variant="body2" color="text.primary" noWrap>
                Drop-off Location: {item.dropOffLocation || "Not specified"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <DateRangeIcon
                sx={{
                  color: "primary.main",
                  mr: 1,
                  fontSize: 20,
                }}
              />
              <Typography variant="body2" color="text.primary" noWrap>
                Date found: {formatDate(item?.createdAt)}
              </Typography>
            </Box>
            {Array.isArray(item?.claimedBy) && item.claimedBy.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Claimed by:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    overflowX: "auto",
                    "&::-webkit-scrollbar": {
                      height: 6,
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "grey.200",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "grey.400",
                      borderRadius: 3,
                    },
                  }}
                >
                  {item.claimedBy.map((claimer, index) => (
                    <Chip
                      key={index}
                      label={claimer}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        mr: 1,
                        my: 1,
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "center", p: 2, mt: "auto" }}>
          {renderActionButton()}
        </CardActions>
      </Card>
      <Dialog
        open={fullImageDialog.open}
        onClose={handleCloseFullImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseFullImageDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {fullImageDialog.imageUrl ? (
            <img
              src={fullImageDialog.imageUrl}
              alt={fullImageDialog.itemName}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          ) : (
            <Typography variant="body1" align="center">
              No image available for {fullImageDialog.itemName}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ItemCardComponent;
