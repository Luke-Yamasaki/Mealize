/**
 * Lucide-based replacements for legacy SVG icon components.
 * Preserves export names and common props (`theme`, `color`) used across the app.
 */
import {
  Apple,
  Beef,
  Building2,
  Carrot,
  Check,
  ChevronsDown,
  Clock,
  Eye,
  Hand as HandLucide,
  HeartHandshake,
  Home,
  Image as ImageLucide,
  Inbox,
  Keyboard,
  MapPin,
  Mic,
  Milk,
  Moon,
  MousePointer2,
  Pencil,
  Search,
  Settings as SettingsGear,
  Star,
  Sun,
  Trash2,
  TriangleAlert,
  Truck,
  Wheat,
  X,
} from "lucide-react";

const navContrast = (theme) => (theme === "light" ? "#ffffff" : "#191919");
const textContrast = (theme) => (theme === "light" ? "#191919" : "#ffffff");
const brand = "#28a690";

export const HomeIcon = ({ theme = "light", ...rest }) => (
  <Home color={navContrast(theme)} strokeWidth={2.5} size={25} {...rest} />
);

export const InboxIcon = ({ theme = "light", ...rest }) => (
  <Inbox color={navContrast(theme)} strokeWidth={2} size={25} {...rest} />
);

export const InboxIconNotification = ({ theme = "light", ...rest }) => (
  <span className="relative inline-flex" {...rest}>
    <Inbox color={navContrast(theme)} strokeWidth={2} size={25} />
    <span
      className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#c2462a]"
      aria-hidden
    />
  </span>
);

export const VolunteerIcon = ({ theme = "light", ...rest }) => (
  <Truck color={navContrast(theme)} strokeWidth={2} size={29} {...rest} />
);

export const LargeVolunteerIcon = (props) => (
  <Truck color={brand} strokeWidth={1.25} size={200} {...props} />
);

export const Settings = ({ theme = "light", ...rest }) => (
  <SettingsGear color={navContrast(theme)} strokeWidth={2.5} size={26} {...rest} />
);

/** Search bar passes `theme` (not `color`). */
export const MagnifyingGlass = ({ theme, color, ...rest }) => {
  let stroke = brand;
  if (color === "black") stroke = "#191919";
  else if (color === "white") stroke = "#ffffff";
  else if (theme === "light") stroke = "#191919";
  else if (theme === "dark") stroke = "#ffffff";
  return <Search color={stroke} strokeWidth={2.5} size={24} {...rest} />;
};

export const FavoritesFilterIcon = (props) => (
  <Star
    size={28}
    fill="#76D97E"
    stroke={brand}
    strokeWidth={1.25}
    {...props}
  />
);

const badgeBox =
  "inline-flex h-[30px] w-[30px] items-center justify-center rounded-[5px]";

export const AvailableIcon = ({ theme = "light", ...rest }) => (
  <span
    className={badgeBox}
    style={{
      background: theme === "light" ? "#a4dba3" : "#4CB849",
    }}
    {...rest}
  >
    <Check
      size={18}
      strokeWidth={3}
      color={theme === "light" ? "#191919" : "#ffffff"}
    />
  </span>
);

export const UnavailableIcon = ({ theme = "light", ...rest }) => (
  <span
    className={badgeBox}
    style={{
      background: theme === "light" ? "#e0a193" : "#C2462A",
    }}
    {...rest}
  >
    <X
      size={18}
      strokeWidth={3}
      color={theme === "light" ? "#191919" : "#ffffff"}
    />
  </span>
);

export const DairyIcon = (props) => (
  <Milk color="#191919" strokeWidth={2} size={28} {...props} />
);

export const VegetablesIcon = (props) => (
  <Carrot color="#191919" strokeWidth={2} size={28} {...props} />
);

export const FruitsIcon = (props) => (
  <Apple color="#191919" strokeWidth={2} size={28} {...props} />
);

export const GrainsIcon = (props) => (
  <Wheat color="#191919" strokeWidth={2} size={28} {...props} />
);

export const ProteinIcon = (props) => (
  <Beef color="#191919" strokeWidth={2} size={28} {...props} />
);

export const Business = ({ theme, ...rest } = {}) => {
  const color =
    theme === "light" ? "#ffffff" : theme === "dark" ? "#191919" : brand;
  return (
    <Building2 color={color} strokeWidth={2} size={28} {...rest} />
  );
};

export const Nonprofit = ({ theme, color, ...rest } = {}) => {
  let stroke = brand;
  if (color === "black") stroke = "#191919";
  else if (color === "white") stroke = "#ffffff";
  else if (theme === "light") stroke = "#191919";
  else if (theme === "dark") stroke = "#ffffff";
  return (
    <HeartHandshake color={stroke} strokeWidth={2} size={28} {...rest} />
  );
};

/** Original asset was an “eye”; kept name for import sites (login visibility). */
export const PasswordIcon = ({ theme = "light", ...rest }) => (
  <Eye color={textContrast(theme)} strokeWidth={2} size={18} {...rest} />
);

export const EditIcon = ({ theme = "light", ...rest }) => (
  <Pencil color={textContrast(theme)} strokeWidth={2.5} size={24} {...rest} />
);

export const TrashIcon = ({ theme = "light", ...rest }) => (
  <Trash2 color={textContrast(theme)} strokeWidth={2.5} size={26} {...rest} />
);

export const LocationPin = ({ theme, ...rest } = {}) => {
  const color =
    theme === "light" || theme === "dark" ? textContrast(theme) : brand;
  return <MapPin color={color} strokeWidth={2.5} size={26} {...rest} />;
};

export const ClockIcon = ({ theme = "light", ...rest }) => (
  <Clock color={textContrast(theme)} strokeWidth={2.5} size={28} {...rest} />
);

export const SunIcon = ({ theme = "light", ...rest }) => (
  <Sun color={textContrast(theme)} strokeWidth={2.5} size={30} {...rest} />
);

export const MoonIcon = ({ theme = "light", ...rest }) => (
  <Moon color={textContrast(theme)} strokeWidth={2.5} size={30} {...rest} />
);

export const ImageIcon = ({ theme = "light", ...rest }) => (
  <ImageLucide color={textContrast(theme)} strokeWidth={2} size={30} {...rest} />
);

export const Hand = ({ theme = "light", ...rest }) => (
  <HandLucide
    color={textContrast(theme)}
    strokeWidth={2}
    size={320}
    className="max-h-[min(52vh,520px)] w-auto max-w-full"
    {...rest}
  />
);

export const ScrollArrow = ({ theme = "light", ...rest }) => (
  <ChevronsDown
    color={theme === "light" ? "#191919" : "#b4b4b4"}
    strokeWidth={3}
    size={120}
    className="w-full max-w-[min(90vw,205px)]"
    {...rest}
  />
);

/** Legacy exports — not used in active imports; kept for parity. */
export const KeyboardIcon = ({ theme = "light", ...rest }) => (
  <Keyboard color={textContrast(theme)} size={24} {...rest} />
);

export const ClickIcon = (props) => (
  <MousePointer2 color={brand} size={24} {...props} />
);

export const MicrophoneIcon = ({ color, theme = "light", ...rest }) => {
  const stroke =
    color === "light" || color === "dark"
      ? color === "light"
        ? "#191919"
        : "#ffffff"
      : textContrast(theme);
  return (
    <Mic
      color={stroke}
      strokeWidth={2}
      size={24}
      className="opacity-70"
      {...rest}
    />
  );
};

export const Triangle = (props) => (
  <TriangleAlert color={brand} size={48} {...props} />
);
