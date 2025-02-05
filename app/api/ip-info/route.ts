import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { ip } = await req.json();

        if (!ip) {
            return NextResponse.json(
                { error: "IP address is required" },
                { status: 400 }
            );
        }

        const accKey = process.env.ACCESS_KEY_IPSTACK;
        const apiUrl = `http://api.ipstack.com/${ip}?access_key=${accKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch IP data" },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Ambil hanya data yang diperlukan
        const filteredData = {
            ip: data.ip,
            hostname: data.hostname,
            type: data.type,
            continent_code: data.continent_code,
            continent_name: data.continent_name,
            country_code: data.country_code,
            country_name: data.country_name,
            region_code: data.region_code,
            region_name: data.region_name,
            city: data.city,
            zip: data.zip,
        };

        return NextResponse.json(filteredData);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
