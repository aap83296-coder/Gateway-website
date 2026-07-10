import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    id: bigint;
    title: string;
    icon: string;
    description: string;
    benefits: Array<string>;
}
export interface ContactMessage {
    id: bigint;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface PortfolioItem {
    id: bigint;
    client: string;
    title: string;
    year: bigint;
    description: string;
    technologies: Array<string>;
    category: string;
}
export interface backendInterface {
    addPortfolioItem(title: string, client: string, year: bigint, category: string, technologies: Array<string>, description: string): Promise<PortfolioItem>;
    addService(title: string, description: string, icon: string, benefits: Array<string>): Promise<Service>;
    checkAdminCredentials(username: string, password: string): Promise<boolean>;
    deletePortfolioItem(id: bigint): Promise<boolean>;
    deleteService(id: bigint): Promise<boolean>;
    listContactMessages(): Promise<Array<ContactMessage>>;
    listPortfolioItems(): Promise<Array<PortfolioItem>>;
    listServices(): Promise<Array<Service>>;
    submitContactMessage(name: string, email: string, phone: string, subject: string, message: string): Promise<ContactMessage>;
    updatePortfolioItem(id: bigint, title: string, client: string, year: bigint, category: string, technologies: Array<string>, description: string): Promise<boolean>;
    updateService(id: bigint, title: string, description: string, icon: string, benefits: Array<string>): Promise<boolean>;
}
