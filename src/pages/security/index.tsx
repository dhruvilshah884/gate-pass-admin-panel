"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CreateSecurityDialog } from "@/components/create-security-dialog";
import { SecurityTable } from "@/components/security-table";
import "../../styles/globals.css";
import DashboardLayout from "@/layout/DashboardLayout";

export default function SecurityPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage security staff and their schedules
          </p>
        </div>
        <CreateSecurityDialog>
          <Button
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Security Staff
          </Button>
        </CreateSecurityDialog>
      </div>
      <SecurityTable />
    </motion.div>
  );
}
SecurityPage.layout = DashboardLayout;
