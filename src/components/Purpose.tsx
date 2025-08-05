
import { PurposeCard } from "@/components/cards/PurposeCard";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SellIcon from "@mui/icons-material/Sell";

const purpose = [
  {
    id: 1,
    color: "text-blue-600",
    backgroundColor: "bg-blue-100",
    icon: <SsidChartIcon />,
    header: "Reading Progress Tracking",
    body: `Track your reading goals, monitor progress, and celebrate milestones
            with our advanced analytics dashboard`,
  },
  {
    id: 2,
    color: "text-green-600",
    backgroundColor: "bg-green-100",
    icon: <SmartToyIcon />,
    header: "AI Powered Recommendations",
    body: `Get personalized book suggestions based on your reading history, preferences and ratings`,
  },
  {
    id: 3,
    color: "text-fuchsia-600",
    backgroundColor: "bg-fuchsia-100",
    icon: <SellIcon />,
    header: "Best Proce Guarantee",
    body: `Compare prices accross multiple retailers and always get the best deal on your favorite books.`,
  },
];

export default function Purpose() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Why Choose Bookify?
        </h2>
        <p className="text-sm text-gray-600">
          Everything you need for the perfect reading experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {purpose.map((card) => (
          <PurposeCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
