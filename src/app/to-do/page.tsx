"use client";
import { ToDoContent } from "@/components/ToDoContent";
import { useMainContext } from "@/context/MainContext";
import { useEffect } from "react";
import {  useParams } from "next/navigation";

export default function ToDO() {
    const mainContext = useMainContext();
    const params = useParams();
    useEffect(() => {
        if (params.id !== undefined) mainContext?.setPageOpen(params.id[1].split('-').join(' ').trim() as string);
    }, [mainContext,params]);
    return(
        <div className="w-screen h-screen">
            <ToDoContent />
        </div>
    )
}