import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDuration, formatDateTime } from "@/lib/analytics";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export function RecentCallsTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const filteredCalls = data.filter((call) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      call.callerName?.toLowerCase().includes(search) ||
      call.callerNumber?.toLowerCase().includes(search) ||
      call.receiverNumber?.toLowerCase().includes(search) ||
      call.city?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "success" && call.callStatus) ||
      (statusFilter === "failed" && !call.callStatus);

    const matchesDirection =
      directionFilter === "all" ||
      (directionFilter === "incoming" && call.callDirection) ||
      (directionFilter === "outgoing" && !call.callDirection);

    return matchesSearch && matchesStatus && matchesDirection;
  });

  const sortedCalls = [...filteredCalls].sort(
    (a, b) => new Date(b.callStartTime) - new Date(a.callStartTime)
  );

  const totalPages = Math.ceil(sortedCalls.length / recordsPerPage) || 1;

  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedCalls = sortedCalls.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Call Logs</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 md:grid-cols-4 mb-4">
          <input
            type="text"
            placeholder="Search name, number, city..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-md border px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-700"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-md border px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-700"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={directionFilter}
            onChange={(e) => {
              setDirectionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-md border px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-700"
          >
            <option value="all">All Directions</option>
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
          </select>

          <select
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-md border px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-700"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead>Caller Name</TableHead>
                <TableHead>Caller Number</TableHead>
                <TableHead>Receiver Number</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    {call.callDirection ? (
                      <ArrowDownLeft className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-blue-600" />
                    )}
                  </TableCell>

                  <TableCell className="font-medium">
                    {call.callerName}
                  </TableCell>

                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {call.callerNumber}
                  </TableCell>

                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {call.receiverNumber}
                  </TableCell>

                  <TableCell>{call.city}</TableCell>

                  <TableCell>{formatDuration(call.callDuration)}</TableCell>

                  <TableCell className="font-medium">
                    ${call.callCost}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={call.callStatus ? "default" : "destructive"}
                      className={
                        call.callStatus
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {call.callStatus ? "Success" : "Failed"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {formatDateTime(call.callStartTime)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {sortedCalls.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + recordsPerPage, sortedCalls.length)} of{" "}
            {sortedCalls.length} records
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 border rounded-md disabled:opacity-50 dark:border-slate-700"
            >
              Previous
            </button>

            <span className="px-3 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 border rounded-md disabled:opacity-50 dark:border-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}