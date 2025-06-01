"use client"

import { Navbar } from "@/components/Navbar.tsx";
import { MainCarousel } from "@/components/Carousel.tsx";
import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const HomePage = () => {
    const [selectedOption, setSelectedOption] = React.useState("")

    const options = [
        { value: "option1", label: "Opcja 1" },
        { value: "option2", label: "Opcja 2" },
        { value: "option3", label: "Opcja 3" },
        { value: "option4", label: "Opcja 4" },
        { value: "option5", label: "Opcja 5" },
    ]

    return (
        <>
            <Navbar/>
            <MainCarousel/>
            <div className="max-w-md mx-auto mt-8 p-4">
                <div className="space-y-2">
                    <label htmlFor="select-option" className="text-sm font-medium">
                        Wybierz opcję:
                    </label>
                    <Select value={selectedOption} onValueChange={setSelectedOption}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Wybierz opcję z listy..." />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedOption && (
                    <div className="p-4 mt-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Wybrana opcja:</p>
                        <p className="font-medium">{options.find((opt) => opt.value === selectedOption)?.label}</p>
                    </div>
                )}
            </div>
        </>
    );
};