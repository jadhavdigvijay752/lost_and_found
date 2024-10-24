import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Input,
} from '@mui/material';

/**
 * AddItemDialog is a React component that renders a dialog for adding a new item.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the dialog is open.
 * @param {Function} props.onClose - Function to close the dialog.
 * @param {Object} props.newItem - The new item data.
 * @param {Function} props.setNewItem - Function to update the new item data.
 * @param {Function} props.handleAddItem - Function to handle adding the item.
 * @param {Function} props.handleImageChange - Function to handle image file changes.
 * @returns {JSX.Element} The rendered AddItemDialog component.
 */
const AddItemDialog = ({
	isOpen,
	onClose,
	newItem,
	setNewItem,
	handleAddItem,
	handleImageChange,
}) => {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogTitle>Add New Item</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label="Item Name"
					fullWidth
					value={newItem.name}
					onChange={(e) =>
						setNewItem({ ...newItem, name: e.target.value })
					}
				/>
				<TextField
					margin="dense"
					label="Additional Comment"
					fullWidth
					multiline
					rows={3}
					value={newItem.description}
					onChange={(e) =>
						setNewItem({
							...newItem,
							description: e.target.value,
						})
					}
				/>
				<TextField
					margin="dense"
					label="Color"
					fullWidth
					value={newItem.color}
					onChange={(e) =>
						setNewItem({
							...newItem,
							color: e.target.value,
						})
					}
				/>
				<TextField
					margin="dense"
					label="Size"
					fullWidth
					value={newItem.size}
					onChange={(e) =>
						setNewItem({ ...newItem, size: e.target.value })
					}
				/>
				<TextField
					margin="dense"
					label="Location Found"
					fullWidth
					value={newItem.foundLocation}
					onChange={(e) =>
						setNewItem({
							...newItem,
							foundLocation: e.target.value,
						})
					}
				/>
				<TextField
					margin="dense"
					label="Drop-off Location"
					fullWidth
					value={newItem.dropOffLocation}
					onChange={(e) =>
						setNewItem({
							...newItem,
							dropOffLocation: e.target.value,
						})
					}
				/>
				<TextField
					margin="dense"
					label="Found Date"
					type="date"
					fullWidth
					InputLabelProps={{
						shrink: true,
					}}
					value={newItem.foundDate}
					onChange={(e) =>
						setNewItem({
							...newItem,
							foundDate: e.target.value,
						})
					}
				/>
				<Input
					type="file"
					onChange={handleImageChange}
					fullWidth
					margin="dense"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleAddItem}>Add</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddItemDialog;
