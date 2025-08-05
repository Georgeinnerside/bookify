interface PurposeCardProps {
    card: {
      color: string;
      backgroundColor: string;
      icon: React.ReactNode;
      header: string;
      body: string;
    };
  }
  

export const PurposeCard = ({ card }: PurposeCardProps) => {
  return (
     <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg">
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full ${card.backgroundColor} ${card.color} text-2xl mb-4`}
      >
        {card.icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.header}</h3>
      <p className="text-sm text-gray-500">{card.body}</p>
    </div>
  );
};
