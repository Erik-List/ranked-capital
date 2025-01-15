"use client";

import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockLogs } from '@/lib/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

export default function LogsPage() {
  const [stageFilter, setStageFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [logs, setLogs] = useState(mockLogs);

  useEffect(() => {
    // Check for new log entry in localStorage
    const lastLog = window.localStorage.getItem('lastLog');
    if (lastLog) {
      const newLog = JSON.parse(lastLog);
      setLogs([newLog, ...mockLogs]);
      // Clear the localStorage after reading
      window.localStorage.removeItem('lastLog');
    }
  }, []);

  const filteredLogs = logs
    .filter(log => {
      if (stageFilter !== 'all' && log.stageOfCompany !== stageFilter) {
        return false;
      }
      if (positionFilter !== 'all' && log.positionOfFounder !== positionFilter) {
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Activity className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Activity Logs</h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Company Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="pre-seed">Pre-seed</SelectItem>
              <SelectItem value="seed">Seed</SelectItem>
              <SelectItem value="series a">Series A</SelectItem>
              <SelectItem value="series b">Series B</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Founder Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="CEO">CEO</SelectItem>
              <SelectItem value="CTO">CTO</SelectItem>
              <SelectItem value="COO">COO</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Company Stage</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {log.stageOfCompany}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.positionOfFounder}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={log.approvalStatus === 'approved' ? 'default' : 'secondary'}
                    >
                      {log.approvalStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.logMessage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}