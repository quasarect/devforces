"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

// Define types for module and section
interface Section {
  title: string;
  href: string;
}

interface Module {
  title: string;
  description: string;
  sections: Section[];
}

interface SidebarContentProps {
  modules: Module[];
  onClose?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  modules,
  onClose,
}) => {
  return (
    <div className="h-fit p-4 bg-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Welcome</h2>
        {onClose && (
          <button onClick={onClose} aria-label="Close Sidebar">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <Accordion type="single" collapsible className="w-full">
        {modules.map((module, index) => (
          <AccordionItem key={index} value={`module-${index}`}>
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              {module.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                <p className="text-sm pl-4">{module.description}</p>
                {module.sections.map(
                  (section: Section, sectionIndex: number) => (
                    <a
                      key={sectionIndex}
                      href={section.href}
                      className="text-sm pl-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {section.title}
                    </a>
                  )
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SidebarContent;
