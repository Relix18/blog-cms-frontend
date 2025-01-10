"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useGetAllCommentsQuery } from "@/state/api/user/userApi";
import {
  useDeleteCommentMutation,
  useDeleteReplyMutation,
} from "@/state/api/post/postApi";

type Comms = {
  createdAt: Date;
  content: string;
  id: number;
  RepliedTo: {
    content: string;
    id: number;
    user: {
      email: string;
      name: string;
    };
  };
  post: {
    slug: string;
    id: number;
    title: string;
  };
  postId: number;
  type: "Comment" | "Reply";
  user: {
    name: string;
    email: string;
  };
  userId: string;
};

const ActionCell = ({ comms }: { comms: Comms }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deleteComment, { data: commData, isSuccess: commDeleteSuccess }] =
    useDeleteCommentMutation({});
  const [deleteReply, { data: repData, isSuccess: repDeleteSuccess }] =
    useDeleteReplyMutation({});
  const { toast } = useToast();

  const handleDelete = async (type: string) => {
    if (type === "Comment") {
      await deleteComment(comms.id);
    } else if (type === "Reply") {
      await deleteReply(comms.id);
    }
    setIsAlertOpen(false);
  };

  useEffect(() => {
    if (commDeleteSuccess) {
      toast({ title: commData.message });
    }
    if (repDeleteSuccess) {
      toast({ title: repData.message });
    }
  }, [commDeleteSuccess, repDeleteSuccess, repData, commData, toast]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(comms.id.toString())}
          >
            Copy comment ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(comms.userId.toString())
            }
          >
            Copy user ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(comms.postId.toString())
            }
          >
            Copy post ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href={`/post/view/${comms.post.slug}`}>
            <DropdownMenuItem>View Post</DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => setIsAlertOpen(true)}
          >
            Delete {comms.type}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(comms.type)}
              className="bg-destructive hover:bg-destructive/80"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default function Comments() {
  const [data, setData] = useState<Comms[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    RepliedTo_content: false,
    RepliedTo_user_name: false,
    RepliedTo_user_email: false,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<Comms>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "content",
      header: "Content",
      cell: ({ row }) => {
        return <div>{row.getValue("content")}</div>;
      },
    },
    {
      accessorKey: "post.title",
      header: "Post",
      cell: ({ row }) => {
        return <div>{row.getValue("post_title")}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
            row.getValue("type") === "Comment"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {row.getValue("type")}
        </div>
      ),
    },
    {
      accessorKey: "RepliedTo.content",
      header: "RepliedTo",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("RepliedTo_content")}</div>
      ),
    },
    {
      accessorKey: "RepliedTo.user.name",
      header: "RepliedUser",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("RepliedTo_user_name")}</div>
      ),
    },
    {
      accessorKey: "RepliedTo.user.email",
      header: "RepliedEmail",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("RepliedTo_user_email")}
        </div>
      ),
    },
    {
      accessorKey: "user.name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.user.name}</div>
      ),
    },
    {
      accessorKey: "user.email",
      header: "Email",
      cell: ({ row }) => <div>{row.original.user.email}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CreatedAt
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>{format(row.getValue("createdAt"), "yyyy-MM-dd")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <ActionCell comms={row.original} />,
    },
  ];

  const { data: comms } = useGetAllCommentsQuery({});

  useEffect(() => {
    setData(comms?.comms);
  }, [comms]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return value.toLowerCase().includes(filterValue.toLowerCase());
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    },
    initialState: {
      columnVisibility: {
        RepliedTo_content: false,
        RepliedTo_user_name: false,
        RepliedTo_user_email: false,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full px-2">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center  space-x-2">
          <span className="flex w-[180px] text-sm items-center text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger>
              <SelectValue>{table.getState().pagination.pageSize}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  Show {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
