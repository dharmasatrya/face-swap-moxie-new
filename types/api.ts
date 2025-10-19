// ============================================
// types/api.ts (Optional: Shared types)
// ============================================
export interface UploadResponse {
  selfieUrl: string;
}

export interface FaceSwapResponse {
  url: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}