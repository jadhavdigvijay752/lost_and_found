import { format, parseISO } from "date-fns";

/**
 * Formats a date into 'yyyy-MM-dd' format.
 *
 * @param {Date|string|Object} date - The date to format. Can be a Date object, a string, or a Firestore Timestamp object.
 * @returns {string} The formatted date string or 'Invalid Date' if the input is not a valid date.
 */
export const formatDate = (date) => {
  if (!date) return "";
  if (date instanceof Date) {
    // return format(date, 'yyyy-MM-dd');
    return format(date, "MM-dd-yyyy");
  }
  if (typeof date === "object" && date.seconds) {
    // Firestore Timestamp
    return format(new Date(date.seconds * 1000), "MM-dd-yyyy");
    // return format(new Date(date.seconds * 1000), "yyyy-MM-dd");
  }
  try {
    // return format(parseISO(date), "yyyy-MM-dd");
    return format(parseISO(date), "MM-dd-yyyy");
  } catch {
    return "Invalid Date";
  }
};
