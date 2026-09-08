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

const DEFAULT_BUSINESS_INFO: BusinessInfo = {
    companyName: "Trivastu Ventures",
    phone: "+91-8655202633",
    whatsapp: "+91-8655202633",
    email: "contact@trivastu.com",
    address: "Ranchi, Jharkhand",
    city: "Ranchi",
    state: "Jharkhand",
    pincode: "834001"
};

export async function getBusinessInfo(): Promise<BusinessInfo> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch("https://api.trivastu.com/api/cms/business-info", {
            next: { revalidate: 60 },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) return DEFAULT_BUSINESS_INFO;
        const data = await res.json();
        return { ...DEFAULT_BUSINESS_INFO, ...data };
    } catch {
        return DEFAULT_BUSINESS_INFO;
    }
}
