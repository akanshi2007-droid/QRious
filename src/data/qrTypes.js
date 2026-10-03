import {
  Link,
  Type,
  Mail,
  Phone,
  Wifi,
} from "lucide-react";

export const qrTypes = [
  {
    id: "url",
    label: "URL",
    description: "Website or link",
    icon: Link,
  },
  {
    id: "text",
    label: "Text",
    description: "Plain text",
    icon: Type,
  },
  {
    id: "email",
    label: "Email",
    description: "Email address",
    icon: Mail,
  },
  {
    id: "phone",
    label: "Phone",
    description: "Phone number",
    icon: Phone,
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    description: "Wi-Fi network",
    icon: Wifi,
  },
];