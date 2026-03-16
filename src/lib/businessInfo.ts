export interface BusinessInfo {
    companyName?: string;
    phone?: string;
    altPhone?: string;
    email?: string;
    whatsapp?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    googleMapsUrl?: string;
    googlePlaceId?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
}

export async function getBusinessInfo(): Promise<BusinessInfo> {
    try {
        const res = await fetch("https://api.trivastu.com/api/cms/business-info", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        if (!res.ok) return {};
        return await res.json();
    } catch (e) {
        console.error("Failed to fetch business info:", e);
        return {};
    }
}
