// ============================================
// components/ui/error-modal.tsx - New Component
// ============================================
"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
}

export default function ErrorModal({ isOpen, onClose, title, message }: ErrorModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-yakult-red">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={onClose}
            className="bg-yakult-red hover:bg-yakult-red-dark"
          >
            Tutup
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}