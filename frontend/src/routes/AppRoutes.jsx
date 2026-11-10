import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/Login.page";
import RegisterPage from "../pages/auth/Register.page";
import ForgotPasswordPage from "../pages/auth/ForgotPassword.page";
import VerifyOtpPage from "../pages/auth/VerifyOtp.page";
import ResetPasswordPage from "../pages/auth/ResetPassword.page";
import VerifyEmailPage from "../pages/auth/VerifyEmail.page";
import UnauthorizedPage from "../pages/Unauthorized.page";
import EmailVerificationGate from "../pages/auth/EmailVerificationGate.page";
import EmailNotVerifiedGate from "../pages/auth/EmailNotVerifiedGate.page";

import ProfilePage from "../pages/profile/Profile.page";
import EditProfilePage from "../pages/profile/EditProfile.page";
import CreateProfilePage from "../pages/profile/CreateProfile.page";

import ChatsPage from "../pages/chat/Chats.page"


import Layout from "./layout";
import GroupsPage from "../pages/chat/GroupChats.page";
import SettingsPage from "../pages/settings/Settings.page";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/emailVerificationGate" element={<EmailVerificationGate />} />
      <Route path="/emailNotVerifiedGate" element={<EmailNotVerifiedGate />} />
      <Route path="/profile/create" element={<CreateProfilePage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<ChatsPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/groups" element={<GroupsPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}