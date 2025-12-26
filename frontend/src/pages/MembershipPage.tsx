export default function MembershipPage() {
  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
        <header className="bg-blue-600 text-white py-16 px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Global Travel Rewards</h1>
          <p className="text-xl mb-2">
            Earn Travel Points, exclusive perks, and more with every booking!
          </p>
          <p className="text-lg">
            100 Travel Points = $1 USD • Higher tiers = Bigger rewards
          </p>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800">
            Membership Tiers (2025)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {/* Silver */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-8 border-gray-400">
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-gray-600 mb-4">
                  Silver
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  <strong>How to get:</strong> Just register for free!
                </p>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• Base Travel Points on bookings</li>
                  <li>• Exclusive hotel deals & discounts</li>
                  <li>• Member-only promotions</li>
                </ul>
              </div>
            </div>

            {/* Gold */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-8 border-yellow-500">
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-yellow-600 mb-4">
                  Gold
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  <strong>How to get:</strong> Complete 1 eligible booking
                </p>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• 20% more Travel Points</li>
                  <li>• Train refund fee waivers</li>
                  <li>• Exclusive deals + insurance discounts</li>
                </ul>
              </div>
            </div>

            {/* Platinum */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-8 border-gray-300">
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-gray-700 mb-4">
                  Platinum
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  <strong>How to get:</strong> 3 eligible bookings after Gold
                </p>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• 50% more Travel Points</li>
                  <li>• 1-2 Free Airport VIP Lounge accesses/year</li>
                  <li>• Free global eSIM data packages</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
            </div>

            {/* Diamond */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-8 border-cyan-400">
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-cyan-600 mb-4">
                  Diamond
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  <strong>How to get:</strong> 8 bookings (min $1,000) after
                  Platinum
                </p>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• Up to 100% more Travel Points</li>
                  <li>• 2+ Free VIP Lounge accesses</li>
                  <li>• Airport transfer upgrades</li>
                  <li>• VIP dedicated support</li>
                </ul>
              </div>
            </div>

            {/* Diamond+ */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-8 border-pink-500">
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-pink-600 mb-4">
                  Diamond+
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  <strong>How to get:</strong> Spend $10,000+ after Diamond
                </p>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• Up to 150% more Travel Points</li>
                  <li>• 3+ Free VIP Lounge accesses</li>
                  <li>• Premium airport transfers</li>
                  <li>• Free attraction tickets</li>
                  <li>• One-stop VIP concierge service</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-center mt-12 text-gray-600 text-lg">
            Tiers based on eligible bookings/spending in a 12-month period.
            <br />
            Earn Travel Points from flights, hotels, reviews, and more. Redeem
            for discounts!
          </p>

          <div className="text-center mt-16">
            <p className="text-sm text-gray-500">
              Inspired by leading travel loyalty programs • For visualization
              only • Customize as needed 🌍✈️
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
