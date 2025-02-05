"use client";

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    ip: z
        .string()
        .min(7, { message: "IP must be at least 7 characters." })
        .max(15, { message: "IP must be a maximum of 15 characters." }),
});

export function IPForm() {
    const [responseData, setResponseData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ip: "",
        },
    });

    function formatIPInput(value: string) {
        value = value.replace(/[^0-9.]/g, "");

        let parts = value.split(".").map((part) => part.substring(0, 3));
        if (parts.length > 4) parts = parts.slice(0, 4);

        return parts.join(".");
    }

    function handleIPChange(event: React.ChangeEvent<HTMLInputElement>) {
        const formattedIP = formatIPInput(event.target.value);
        form.setValue("ip", formattedIP, { shouldValidate: true });
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        setResponseData(null);
        setError(null);

        try {
            const res = await fetch("/api/ip-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ip: values.ip }),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch IP data.");
            }

            const data = await res.json();

            setResponseData(`
                IP: ${data.ip}
                Hostname: ${data.hostname}
                Type: ${data.type}
                Continent: ${data.continent_name} (${data.continent_code})
                Country: ${data.country_name} (${data.country_code})
                Region: ${data.region_name} (${data.region_code})
                City: ${data.city}
                ZIP: ${data.zip}
            `);
        } catch (err) {
            setError("Error fetching IP information.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="p-5 w-[400px]">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="ip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">IP</FormLabel>
                                <FormControl>
                                    <Input
                                        id="ipinput"
                                        placeholder="192.168.xxx.xxx"
                                        {...field}
                                        onChange={handleIPChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Input the IP address you want to check.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Submit"}
                        </Button>
                    </motion.button>
                </form>
            </Form>

            <Card className="mt-4 bg-gray-200 p-3">
                <p className="font-bold">Response:</p>
                {loading && <p className="text-blue-500">Fetching data...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {responseData && (
                    <div className="mt-2 p-2 rounded-md text-md">
                        <p className="text-balance whitespace-pre-wrap">
                            {responseData}
                        </p>
                    </div>
                )}
            </Card>
        </Card>
    );
}
