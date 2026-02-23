import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Code,
  Layout,
  Database,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "../lib/utils";

interface DocSection {
  heading: string;
  description?: string;
  steps?: string[];
}

interface DocModule {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  sections: DocSection[];
}

const docModules: DocModule[] = [
  {
    id: "dashboard",
    title: "Dashboard Overview",
    icon: Layout,
    description: "The central hub for administrative oversight.",
    sections: [
      {
        heading: "What you can do here",
        description:
          "The Dashboard provides quick insights into your store's performance at a glance.",
        steps: [
          "View metrics: Total revenue, active orders, and new customers.",
          "Analyze trends: View charts visualizing sales performance over time.",
          "Quick actions: Jump straight into managing orders or viewing low-stock products.",
        ],
      },
    ],
  },
  {
    id: "products",
    title: "Products & Inventory",
    icon: Database,
    description: "Manage your store's catalog and product listings.",
    sections: [
      {
        heading: "Adding New Products",
        description:
          "You can add products to your store either one by one (manually) or in bulk using a CSV file.",
        steps: [
          "Manual Entry: Click 'Add Product' from the Products page. Fill out the necessary fields like Title, Price, Description, and Category. Upload your images and hit Save.",
          "Bulk Import (CSV): If you have many products, click 'Import CSV' on the Products list page, upload a formatted file, and all products will be created instantly.",
        ],
      },
      {
        heading: "Deleting Products",
        description: "Products can be removed individually or in batches.",
        steps: [
          "Single Deletion: Find the product in the list and click the red trash icon next to it.",
          "Bulk Deletion: Check the selection boxes next to multiple products, and then click the 'Delete Selected' button that appears at the top.",
        ],
      },
    ],
  },
  {
    id: "orders",
    title: "Orders Processing",
    icon: Zap,
    description: "Process customer purchases and fulfillment.",
    sections: [
      {
        heading: "Viewing Orders",
        description: "Track all recent purchases from customers.",
        steps: [
          "Navigate to the Orders tab from the sidebar to view a list of all successful and pending payments.",
          "Click on any individual order ID to view detailed information including the shipping address, purchased items, and total amount paid.",
        ],
      },
      {
        heading: "Updating Order Status",
        description: "Keep customers informed about their order's progress.",
        steps: [
          "Open an order's detail page.",
          "Use the status dropdown to change the current status (e.g., from 'Processing' to 'Shipped' or 'Delivered').",
          "Save your changes to notify the system.",
        ],
      },
    ],
  },
  {
    id: "marketing",
    title: "Coupons & Marketing",
    icon: BookOpen,
    description: "Tools to increase sales and promote your store.",
    sections: [
      {
        heading: "Creating a Coupon",
        description:
          "Generate discount codes for customers to use at checkout.",
        steps: [
          "Go to Marketing > Coupons in the sidebar.",
          "Click 'Create Coupon'.",
          "Set the alphanumeric code you want customers to type (e.g., 'SUMMER10').",
          "Choose the discount amount and type (percent or fixed price).",
          "Set limits: Set an expiry date and maximum usage limit.",
          "Click Save to make the coupon live.",
        ],
      },
    ],
  },
  {
    id: "blogs",
    title: "Content & Blogs",
    icon: Code,
    description: "Publish articles and manage content marketing.",
    sections: [
      {
        heading: "Creating a Blog Post",
        description: "Write articles to improve SEO and engage customers.",
        steps: [
          "Navigate to Content > Blogs and click 'Create Blog'.",
          "Use the rich text editor to write your article. You can use headings, bold text, lists, and quotes.",
          "Upload a compelling cover image.",
          "Product Linking: You can directly embed product cards into the blog post so readers can buy items mentioned in your article.",
        ],
      },
      {
        heading: "Managing Blog Posts",
        steps: [
          "You can edit or delete existing blogs from the list view.",
          "Blogs can be grouped by categories to help users navigate your content on the storefront.",
        ],
      },
    ],
  },
  {
    id: "customers",
    title: "Customers Directory",
    icon: Shield,
    description: "Managing user profiles and viewing engagement history.",
    sections: [
      {
        heading: "Understanding Customer Data",
        steps: [
          "The Customers list shows all registered users on the platform.",
          "Clicking a customer row opens their detail page, which shows their total spend, order history, and contact information.",
        ],
      },
    ],
  },
  {
    id: "development",
    title: "Currently in Development",
    icon: Layout,
    description:
      "Features that are currently static or under active development.",
    sections: [
      {
        heading: "Work in Progress Modules",
        description:
          "The following sections of the admin panel currently display static placeholder data and do not yet interact with the live database. Full functionality will be rolled out in upcoming updates.",
        steps: [
          "User Profile (Admin): Updating your own profile details.",
          "Shipping & Inquiries: Real-time courier integration and dedicated customer support messaging.",
          "System Health Map: The live server infrastructure monitoring dashboard.",
          "Analytics & SEO Auditor: Fully dynamic fetching of page rankings.",
        ],
      },
    ],
  },
];

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModule, setActiveModule] = useState(docModules[0].id);

  const filteredModules = docModules.filter(
    (mod) =>
      mod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.sections.some(
        (sec) =>
          sec.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sec.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sec.steps?.some((step) =>
            step.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      ),
  );

  const selectedModule =
    docModules.find((mod) => mod.id === activeModule) || docModules[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin User Manual
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Comprehensive step-by-step guide to managing your ecommerce store.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Sidebar doc navigation */}
        <div className="col-span-1 md:col-span-4 lg:col-span-3 bg-white border border-border rounded-xl  overflow-hidden flex flex-col shadow-sm">
          <div className="p-4 border-b border-border bg-gray-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search instructions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {filteredModules.length > 0 ? (
              filteredModules.map((mod) => {
                const isActive = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModule(mod.id)}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-secondary text-foreground",
                    )}
                  >
                    <mod.icon
                      className={cn(
                        "w-5 h-5 mt-0.5 shrink-0",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    />
                    <div>
                      <h4
                        className={cn(
                          "font-medium text-sm",
                          isActive ? "text-white" : "text-foreground",
                        )}
                      >
                        {mod.title}
                      </h4>
                      <p
                        className={cn(
                          "text-xs line-clamp-1 mt-0.5",
                          isActive
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground",
                        )}
                      >
                        {mod.description}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No modules found matching search.
              </div>
            )}
          </div>
        </div>

        {/* Main Doc Content */}
        <div className="col-span-1 md:col-span-8 lg:col-span-9 bg-white border border-border rounded-xl shadow-sm p-6 lg:p-10 overflow-y-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
              <selectedModule.icon className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{selectedModule.title}</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground mb-8">
              <p className="text-lg text-foreground/80 font-medium border-b border-border pb-6">
                {selectedModule.description}
              </p>
            </div>

            <div className="space-y-10">
              {selectedModule.sections.map((section, idx) => (
                <div key={idx} className="bg-white">
                  <h3 className="text-xl font-bold text-foreground mb-3 font-serif">
                    {section.heading}
                  </h3>
                  {section.description && (
                    <p className="text-muted-foreground mb-4">
                      {section.description}
                    </p>
                  )}
                  {section.steps && section.steps.length > 0 && (
                    <div className="bg-secondary/30 p-5 rounded-xl border border-border/50">
                      <ul className="space-y-4">
                        {section.steps.map((step, stepIdx) => (
                          <li key={stepIdx} className="flex gap-3 text-sm">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-xs mt-0.5">
                              {stepIdx + 1}
                            </span>
                            <span className="text-foreground leading-relaxed">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
