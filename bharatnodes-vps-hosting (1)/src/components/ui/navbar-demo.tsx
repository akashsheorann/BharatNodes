"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { Server, Database, Shield, Globe, Zap, Cpu, HardDrive } from "lucide-react";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={`fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ${className}`}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/#features">VPS Hosting</HoveredLink>
            <HoveredLink href="/#locations">Global Locations</HoveredLink>
            <HoveredLink href="/#configurator">Server Configurator</HoveredLink>
            <HoveredLink href="/dashboard">Dashboard</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Starter VPS"
              href="/#configurator"
              src="https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=140&h=70&fit=crop"
              description="Perfect for small projects and development environments."
            />
            <ProductItem
              title="Business VPS"
              href="/#configurator"
              src="https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=140&h=70&fit=crop"
              description="High-performance servers for growing businesses."
            />
            <ProductItem
              title="Enterprise VPS"
              href="/#configurator"
              src="https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=140&h=70&fit=crop"
              description="Dedicated resources for mission-critical applications."
            />
            <ProductItem
              title="Managed Hosting"
              href="/#configurator"
              src="https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=140&h=70&fit=crop"
              description="Fully managed servers with expert support."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/knowledge-base">Knowledge Base</HoveredLink>
            <HoveredLink href="/about">About Us</HoveredLink>
            <HoveredLink href="/contact">Contact</HoveredLink>
            <HoveredLink href="/support">Support</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
