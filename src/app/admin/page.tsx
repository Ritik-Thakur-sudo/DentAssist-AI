import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import AdminDashboardClient from './AdminDashboardClient';

async function AdminPage() {

    const user = await currentUser();

    // user is not logged in, redirect to home page
    if (!user) {
        redirect("/");
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const userEmail = user.emailAddresses[0].emailAddress;

    // user is not admin, redirect to home page
    if (!adminEmail || userEmail !== adminEmail) {
        redirect("/dashboard");
    }

    return (
        <AdminDashboardClient />
    )
}

export default AdminPage;