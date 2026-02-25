import { TableKit } from "@tiptap/extension-table";

export const tableExtension = TableKit.configure({
  table: {
    HTMLAttributes: {
      class: "border-collapse table-fixed w-full m-0 border border-border",
    },
    resizable: true,
  },
  tableRow: {
    HTMLAttributes: {
      class: "border-b border-border",
    },
  },
  tableHeader: {
    HTMLAttributes: {
      class: "bg-muted font-bold p-1 border border-border",
    },
  },
  tableCell: {
    HTMLAttributes: {
      class: "p-1 border border-border",
    },
  },
});
