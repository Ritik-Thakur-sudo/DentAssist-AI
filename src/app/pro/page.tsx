import Navbar from "@/components/Navbar";
import { PricingTable } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CrownIcon } from "lucide-react";
import { redirect } from "next/navigation";

async function ProPage() {
    const user = await currentUser();
    if (!user) redirect("/");

    const {has} = await auth();

    const hasProPlan = has({plan: "ai_basic"}) || has({plan: "ai_pro"});

    console.log("hasProPlan", hasProPlan);

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 min-h-[calc(100vh-80px)]">
                <div className="mb-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-linear-to-br from-primary/10 to-background rounded-3xl p-5 sm:p-6 border border-primary/20">
                        <div className="space-y-3 max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-primary">
                                    Upgrade to Pro
                                </span>
                            </div>

                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-1">
                                    Unlock Premium AI Dental Care
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    Get unlimited AI consultations, advanced features, and priority support
                                    to take your dental health to the next level.
                                </p>
                            </div>
                        </div>

                        <div className="hidden lg:flex">
                            <div className="w-24 h-24 lg:w-28 lg:h-28 bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                                <CrownIcon className="w-12 h-12 lg:w-14 lg:h-14 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="text-center space-y-2">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            Choose Your Plan
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                            Select the perfect plan for your dental care needs. All plans include
                            secure access and bank-level encryption.
                        </p>
                    </div>

                    <div className="w-full flex justify-center scale-[0.95] lg:scale-100 origin-top">
                        <PricingTable />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProPage;