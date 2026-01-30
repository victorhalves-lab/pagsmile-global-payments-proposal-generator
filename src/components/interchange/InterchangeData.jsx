// Dados de Interchange Card Not Present - USA
// Baseado nos documentos oficiais da Visa e Mastercard (Efetivo Abril 2025 / Outubro 2025)
// EXCLUI taxas de ATM

// ==================== VISA INTERCHANGE RATES ====================
export const VISA_INTERCHANGE_RATES = [
  // Consumer Credit - Card Not Present (Página 9-11 do documento Visa)
  { program_name: "Recurring Tier 1", card_type: "Consumer Credit", rate_percentage: 1.85, rate_fixed: 0.05, category: "recurring" },
  { program_name: "Recurring Tier 2", card_type: "Consumer Credit", rate_percentage: 2.20, rate_fixed: 0.05, category: "recurring" },
  { program_name: "Recurring Tier 3", card_type: "Consumer Credit", rate_percentage: 2.30, rate_fixed: 0.05, category: "recurring" },
  { program_name: "Recurring", card_type: "Consumer Credit", rate_percentage: 2.30, rate_fixed: 0.05, category: "recurring" },
  { program_name: "Product 1", card_type: "Consumer Credit", rate_percentage: 2.60, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Advertising 1", card_type: "Consumer Credit", rate_percentage: 2.40, rate_fixed: 0.10, category: "industry" },
  { program_name: "Insurance 1", card_type: "Consumer Credit", rate_percentage: 2.35, rate_fixed: 0.10, category: "industry" },
  { program_name: "Education 1", card_type: "Consumer Credit", rate_percentage: 2.25, rate_fixed: 0.10, category: "industry" },
  { program_name: "Healthcare 1", card_type: "Consumer Credit", rate_percentage: 2.40, rate_fixed: 0.10, category: "industry" },
  { program_name: "Real Estate 1", card_type: "Consumer Credit", rate_percentage: 2.25, rate_fixed: 0.10, category: "industry" },
  { program_name: "Services 1", card_type: "Consumer Credit", rate_percentage: 2.40, rate_fixed: 0.10, category: "industry" },
  { program_name: "Travel 1", card_type: "Consumer Credit", rate_percentage: 2.55, rate_fixed: 0.10, category: "travel" },
  { program_name: "Restaurant 1", card_type: "Consumer Credit", rate_percentage: 2.70, rate_fixed: 0.08, category: "restaurant" },
  { program_name: "Taxi 1", card_type: "Consumer Credit", rate_percentage: 2.70, rate_fixed: 0.08, category: "transport" },
  { program_name: "Charity 1", card_type: "Consumer Credit", rate_percentage: 1.35, rate_fixed: 0.05, category: "charity" },
  { program_name: "Government 1", card_type: "Consumer Credit", rate_percentage: 1.55, rate_fixed: 0.10, category: "government" },
  { program_name: "Consumer Bill Payment Service", card_type: "Consumer Credit", rate_percentage: 2.60, rate_fixed: 0.10, category: "bill_payment" },
  { program_name: "CPS/Utility", card_type: "Consumer Credit", rate_percentage: 0.00, rate_fixed: 0.75, category: "utility" },
  { program_name: "Non-Qualified Consumer Credit", card_type: "Consumer Credit", rate_percentage: 3.15, rate_fixed: 0.10, category: "standard" },
  { program_name: "Mail/Phone Order and eCommerce", card_type: "Consumer Credit", rate_percentage: 2.05, rate_fixed: 0.00, category: "ecommerce" },
  
  // Consumer Debit - Card Not Present (Página 6 do documento Visa)
  { program_name: "CPS/Retail 2 Card Not Present", card_type: "Consumer Debit", rate_percentage: 0.65, rate_fixed: 0.15, category: "retail" },
  { program_name: "CPS/Debt Repayment 2", card_type: "Consumer Debit", rate_percentage: 0.65, rate_fixed: 0.15, category: "bill_payment" },
  { program_name: "CPS/Debt Repayment (No Fee)", card_type: "Consumer Debit", rate_percentage: 0.65, rate_fixed: 0.15, category: "bill_payment" },
  { program_name: "CPS/Utility Recurring Bill Payment", card_type: "Consumer Debit", rate_percentage: 0.00, rate_fixed: 0.45, category: "utility" },
  { program_name: "CPS/Utility", card_type: "Consumer Debit", rate_percentage: 0.00, rate_fixed: 0.65, category: "utility" },
  { program_name: "CPS/Government", card_type: "Consumer Debit", rate_percentage: 0.65, rate_fixed: 0.15, category: "government" },
  { program_name: "Consumer Bill Payment Service", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15, category: "bill_payment" },
  { program_name: "CPS/Card Not Present", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15, category: "ecommerce" },
  { program_name: "CPS/e-Commerce Basic", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15, category: "ecommerce" },
  { program_name: "CPS/e-Commerce Preferred Retail", card_type: "Consumer Debit", rate_percentage: 1.60, rate_fixed: 0.15, category: "ecommerce" },
  { program_name: "CPS/e-Commerce Preferred Hotel/Car Rental", card_type: "Consumer Debit", rate_percentage: 1.70, rate_fixed: 0.15, category: "travel" },
  { program_name: "CPS/e-Commerce Preferred Passenger Transport", card_type: "Consumer Debit", rate_percentage: 1.70, rate_fixed: 0.15, category: "transport" },
  { program_name: "CPS/Hotel and Car Rental Card Not Present", card_type: "Consumer Debit", rate_percentage: 1.70, rate_fixed: 0.15, category: "travel" },
  { program_name: "CPS/Passenger Transport Card Not Present", card_type: "Consumer Debit", rate_percentage: 1.70, rate_fixed: 0.15, category: "transport" },
  { program_name: "CPS/Account Funding", card_type: "Consumer Debit", rate_percentage: 1.75, rate_fixed: 0.20, category: "funding" },
  { program_name: "EIRF", card_type: "Consumer Debit", rate_percentage: 1.75, rate_fixed: 0.20, category: "standard" },
  { program_name: "Standard", card_type: "Consumer Debit", rate_percentage: 1.90, rate_fixed: 0.25, category: "standard" },
  
  // Consumer Prepaid - Card Not Present (Página 8 do documento Visa)
  { program_name: "CPS/Retail 2 Card Not Present", card_type: "Consumer Prepaid", rate_percentage: 0.65, rate_fixed: 0.15, category: "retail" },
  { program_name: "CPS/Debt Repayment 2", card_type: "Consumer Prepaid", rate_percentage: 0.65, rate_fixed: 0.15, category: "bill_payment" },
  { program_name: "CPS/Debt Repayment (No Fee)", card_type: "Consumer Prepaid", rate_percentage: 0.65, rate_fixed: 0.15, category: "bill_payment" },
  { program_name: "CPS/Utility Recurring Bill Payment", card_type: "Consumer Prepaid", rate_percentage: 0.00, rate_fixed: 0.45, category: "utility" },
  { program_name: "CPS/Utility", card_type: "Consumer Prepaid", rate_percentage: 0.00, rate_fixed: 0.65, category: "utility" },
  { program_name: "CPS/Government", card_type: "Consumer Prepaid", rate_percentage: 0.65, rate_fixed: 0.15, category: "government" },
  { program_name: "Consumer Bill Payment Service", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20, category: "bill_payment" },
  { program_name: "CPS/Card Not Present", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20, category: "ecommerce" },
  { program_name: "CPS/e-Commerce Basic", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20, category: "ecommerce" },
  { program_name: "CPS/e-Commerce Preferred Retail", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20, category: "ecommerce" },
  { program_name: "CPS/e-Commerce Preferred Hotel/Car Rental", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20, category: "travel" },
  { program_name: "CPS/e-Commerce Preferred Passenger Transport", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20, category: "transport" },
  { program_name: "CPS/Hotel and Car Rental Card Not Present", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20, category: "travel" },
  { program_name: "CPS/Passenger Transport", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20, category: "transport" },
  { program_name: "CPS/Account Funding", card_type: "Consumer Prepaid", rate_percentage: 1.80, rate_fixed: 0.20, category: "funding" },
  { program_name: "EIRF", card_type: "Consumer Prepaid", rate_percentage: 1.80, rate_fixed: 0.20, category: "standard" },
  { program_name: "Standard", card_type: "Consumer Prepaid", rate_percentage: 1.90, rate_fixed: 0.25, category: "standard" },
  
  // Large Purchase Advantage - Card Not Present (Página 17 do documento Visa)
  { program_name: "Large Purchase $10K-$25K", card_type: "Large Purchase Advantage", rate_percentage: 0.70, rate_fixed: 49.50, category: "large_ticket" },
  { program_name: "Large Purchase $25K-$100K", card_type: "Large Purchase Advantage", rate_percentage: 0.60, rate_fixed: 52.50, category: "large_ticket" },
  { program_name: "Large Purchase $100K-$500K", card_type: "Large Purchase Advantage", rate_percentage: 0.50, rate_fixed: 55.50, category: "large_ticket" },
  { program_name: "Large Purchase >$500K", card_type: "Large Purchase Advantage", rate_percentage: 0.40, rate_fixed: 58.50, category: "large_ticket" },
  
  // Business Debit - Card Not Present (Página 20 do documento Visa)
  { program_name: "Business Debit Card Not Present", card_type: "Business Debit", rate_percentage: 2.45, rate_fixed: 0.10, category: "business" },
  { program_name: "Consumer Bill Payment Service Business", card_type: "Business Debit", rate_percentage: 2.45, rate_fixed: 0.10, category: "business" },
  { program_name: "Business Debit Non-Qualified", card_type: "Business Debit", rate_percentage: 2.95, rate_fixed: 0.10, category: "business" },
  { program_name: "Business Utility Recurring Bill Payment", card_type: "Business Debit", rate_percentage: 0.00, rate_fixed: 0.75, category: "utility" },
  { program_name: "Business Utility Card Not Present", card_type: "Business Debit", rate_percentage: 0.00, rate_fixed: 1.50, category: "utility" },
];

// ==================== MASTERCARD INTERCHANGE RATES ====================
export const MASTERCARD_INTERCHANGE_RATES = [
  // Consumer Credit - Core (Páginas 1-2 do documento Mastercard)
  { program_name: "Airline", card_type: "Consumer Credit World High Value", rate_percentage: 2.55, rate_fixed: 0.10, category: "travel" },
  { program_name: "Airline", card_type: "Consumer Credit World Elite", rate_percentage: 2.55, rate_fixed: 0.10, category: "travel" },
  { program_name: "Charities", card_type: "Consumer Credit Core", rate_percentage: 2.00, rate_fixed: 0.10, category: "charity" },
  { program_name: "Charities", card_type: "Consumer Credit Enhanced Value", rate_percentage: 2.00, rate_fixed: 0.10, category: "charity" },
  { program_name: "Charities", card_type: "Consumer Credit World", rate_percentage: 2.00, rate_fixed: 0.10, category: "charity" },
  { program_name: "Charities", card_type: "Consumer Credit World High Value", rate_percentage: 2.00, rate_fixed: 0.10, category: "charity" },
  { program_name: "Charities", card_type: "Consumer Credit World Elite", rate_percentage: 2.00, rate_fixed: 0.10, category: "charity" },
  { program_name: "Convenience Purchases Base", card_type: "Consumer Credit Core", rate_percentage: 1.65, rate_fixed: 0.04, category: "convenience" },
  { program_name: "Convenience Purchases Base", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.80, rate_fixed: 0.04, category: "convenience" },
  { program_name: "Convenience Purchases Base", card_type: "Consumer Credit World", rate_percentage: 1.90, rate_fixed: 0.04, category: "convenience" },
  { program_name: "Convenience Purchases Base", card_type: "Consumer Credit World High Value", rate_percentage: 2.30, rate_fixed: 0.04, category: "convenience" },
  { program_name: "Convenience Purchases Base", card_type: "Consumer Credit World Elite", rate_percentage: 2.30, rate_fixed: 0.04, category: "convenience" },
  { program_name: "Convenience Purchases Tier I", card_type: "Consumer Credit Core", rate_percentage: 1.35, rate_fixed: 0.00, category: "convenience" },
  { program_name: "Convenience Purchases Tier I", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.35, rate_fixed: 0.00, category: "convenience" },
  { program_name: "Convenience Purchases Tier I", card_type: "Consumer Credit World", rate_percentage: 1.45, rate_fixed: 0.00, category: "convenience" },
  { program_name: "Convenience Purchases Tier I", card_type: "Consumer Credit World High Value", rate_percentage: 1.60, rate_fixed: 0.00, category: "convenience" },
  { program_name: "Convenience Purchases Tier I", card_type: "Consumer Credit World Elite", rate_percentage: 1.60, rate_fixed: 0.00, category: "convenience" },
  { program_name: "Full UCAF", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Full UCAF", card_type: "Consumer Credit Enhanced Value", rate_percentage: 2.10, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Full UCAF", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Full UCAF", card_type: "Consumer Credit World High Value", rate_percentage: 2.60, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Full UCAF", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Key-entered", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Key-entered", card_type: "Consumer Credit Enhanced Value", rate_percentage: 2.10, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Key-entered", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Key-entered", card_type: "Consumer Credit World High Value", rate_percentage: 2.60, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Key-entered", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Lodging and Auto Rental", card_type: "Consumer Credit Core", rate_percentage: 1.65, rate_fixed: 0.10, category: "travel" },
  { program_name: "Lodging and Auto Rental", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.75, rate_fixed: 0.10, category: "travel" },
  { program_name: "Merchant UCAF", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Merchant UCAF", card_type: "Consumer Credit Enhanced Value", rate_percentage: 2.10, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Merchant UCAF", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Merchant UCAF", card_type: "Consumer Credit World High Value", rate_percentage: 2.60, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Merchant UCAF", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.10, category: "ecommerce" },
  { program_name: "Merit I", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit I", card_type: "Consumer Credit Enhanced Value", rate_percentage: 2.10, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit I", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit I", card_type: "Consumer Credit World High Value", rate_percentage: 2.60, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit I", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit I (Insurance MCCs)", card_type: "Consumer Credit Core", rate_percentage: 1.43, rate_fixed: 0.05, category: "industry" },
  { program_name: "Merit I (Insurance MCCs)", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.43, rate_fixed: 0.05, category: "industry" },
  { program_name: "Merit I (Insurance MCCs)", card_type: "Consumer Credit World", rate_percentage: 1.43, rate_fixed: 0.05, category: "industry" },
  { program_name: "Merit I (Insurance MCCs)", card_type: "Consumer Credit World High Value", rate_percentage: 2.25, rate_fixed: 0.10, category: "industry" },
  { program_name: "Merit I (Insurance MCCs)", card_type: "Consumer Credit World Elite", rate_percentage: 2.25, rate_fixed: 0.10, category: "industry" },
  { program_name: "Merit I (Real Estate MCCs)", card_type: "Consumer Credit Core", rate_percentage: 1.43, rate_fixed: 0.05, category: "industry" },
  { program_name: "Merit I (Real Estate MCCs)", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.43, rate_fixed: 0.05, category: "industry" },
  { program_name: "Merit I (Real Estate MCCs)", card_type: "Consumer Credit World", rate_percentage: 1.43, rate_fixed: 0.05, category: "industry" },
  { program_name: "Merit I (Real Estate MCCs)", card_type: "Consumer Credit World High Value", rate_percentage: 2.20, rate_fixed: 0.10, category: "industry" },
  { program_name: "Merit I (Real Estate MCCs)", card_type: "Consumer Credit World Elite", rate_percentage: 2.20, rate_fixed: 0.10, category: "industry" },
  { program_name: "Merit I (Day Care MCCs)", card_type: "Consumer Credit Core", rate_percentage: 1.60, rate_fixed: 0.10, category: "industry" },
  { program_name: "Merit I (Day Care MCCs)", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.60, rate_fixed: 0.10, category: "industry" },
  { program_name: "Merit I (Day Care MCCs)", card_type: "Consumer Credit World", rate_percentage: 1.60, rate_fixed: 0.10, category: "industry" },
  { program_name: "Merit III Base", card_type: "Consumer Credit Core", rate_percentage: 1.65, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Base", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.80, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Base", card_type: "Consumer Credit World", rate_percentage: 1.90, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Base", card_type: "Consumer Credit World High Value", rate_percentage: 2.30, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Base", card_type: "Consumer Credit World Elite", rate_percentage: 2.30, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 1", card_type: "Consumer Credit Core", rate_percentage: 1.43, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 1", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.43, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 1", card_type: "Consumer Credit World", rate_percentage: 1.53, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 1", card_type: "Consumer Credit World High Value", rate_percentage: 2.05, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 1", card_type: "Consumer Credit World Elite", rate_percentage: 2.05, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 2", card_type: "Consumer Credit Core", rate_percentage: 1.48, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 2", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.48, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 2", card_type: "Consumer Credit World", rate_percentage: 1.58, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 2", card_type: "Consumer Credit World High Value", rate_percentage: 2.10, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 2", card_type: "Consumer Credit World Elite", rate_percentage: 2.10, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 3", card_type: "Consumer Credit Core", rate_percentage: 1.55, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 3", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.55, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 3", card_type: "Consumer Credit World", rate_percentage: 1.65, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 3", card_type: "Consumer Credit World High Value", rate_percentage: 2.15, rate_fixed: 0.10, category: "merit" },
  { program_name: "Merit III Tier 3", card_type: "Consumer Credit World Elite", rate_percentage: 2.15, rate_fixed: 0.10, category: "merit" },
  { program_name: "Passenger Transport", card_type: "Consumer Credit Core", rate_percentage: 1.65, rate_fixed: 0.10, category: "transport" },
  { program_name: "Passenger Transport", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.75, rate_fixed: 0.10, category: "transport" },
  { program_name: "Payment Transaction (Gaming)", card_type: "Consumer Credit", rate_percentage: 0.00, rate_fixed: 0.10, category: "gaming" },
  { program_name: "Payment Transaction", card_type: "Consumer Credit", rate_percentage: 0.19, rate_fixed: 0.53, category: "payment" },
  { program_name: "Petroleum Base", card_type: "Consumer Credit Core", rate_percentage: 1.90, rate_fixed: 0.00, category: "fuel" },
  { program_name: "Petroleum Base", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.90, rate_fixed: 0.00, category: "fuel" },
  { program_name: "Petroleum Base", card_type: "Consumer Credit World", rate_percentage: 2.00, rate_fixed: 0.00, category: "fuel" },
  { program_name: "Petroleum Base", card_type: "Consumer Credit World High Value", rate_percentage: 2.00, rate_fixed: 0.00, category: "fuel" },
  { program_name: "Petroleum Base", card_type: "Consumer Credit World Elite", rate_percentage: 2.00, rate_fixed: 0.00, category: "fuel" },
  { program_name: "Public Sector", card_type: "Consumer Credit Core", rate_percentage: 1.55, rate_fixed: 0.10, category: "government" },
  { program_name: "Public Sector", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.55, rate_fixed: 0.10, category: "government" },
  { program_name: "Public Sector", card_type: "Consumer Credit World", rate_percentage: 1.55, rate_fixed: 0.10, category: "government" },
  { program_name: "Public Sector", card_type: "Consumer Credit World High Value", rate_percentage: 1.55, rate_fixed: 0.10, category: "government" },
  { program_name: "Public Sector", card_type: "Consumer Credit World Elite", rate_percentage: 1.55, rate_fixed: 0.10, category: "government" },
  { program_name: "Restaurant", card_type: "Consumer Credit World", rate_percentage: 1.85, rate_fixed: 0.10, category: "restaurant" },
  { program_name: "Restaurant", card_type: "Consumer Credit World High Value", rate_percentage: 2.00, rate_fixed: 0.10, category: "restaurant" },
  { program_name: "Restaurant", card_type: "Consumer Credit World Elite", rate_percentage: 2.00, rate_fixed: 0.10, category: "restaurant" },
  { program_name: "Service Industries", card_type: "Consumer Credit Core", rate_percentage: 1.15, rate_fixed: 0.05, category: "industry" },
  { program_name: "Service Industries", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.15, rate_fixed: 0.05, category: "industry" },
  { program_name: "Service Industries", card_type: "Consumer Credit World", rate_percentage: 1.15, rate_fixed: 0.05, category: "industry" },
  { program_name: "Service Industries", card_type: "Consumer Credit World High Value", rate_percentage: 1.15, rate_fixed: 0.05, category: "industry" },
  { program_name: "Service Industries", card_type: "Consumer Credit World Elite", rate_percentage: 1.15, rate_fixed: 0.05, category: "industry" },
  { program_name: "Small Ticket Card-Not-Present", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.02, category: "small_ticket" },
  { program_name: "Small Ticket Card-Not-Present", card_type: "Consumer Credit Enhanced Value", rate_percentage: 2.10, rate_fixed: 0.02, category: "small_ticket" },
  { program_name: "Small Ticket Card-Not-Present", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.02, category: "small_ticket" },
  { program_name: "Small Ticket Card-Not-Present", card_type: "Consumer Credit World High Value", rate_percentage: 2.60, rate_fixed: 0.02, category: "small_ticket" },
  { program_name: "Small Ticket Card-Not-Present", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.02, category: "small_ticket" },
  { program_name: "Standard", card_type: "Consumer Credit Core", rate_percentage: 3.15, rate_fixed: 0.10, category: "standard" },
  { program_name: "Standard", card_type: "Consumer Credit Enhanced Value", rate_percentage: 3.15, rate_fixed: 0.10, category: "standard" },
  { program_name: "Standard", card_type: "Consumer Credit World", rate_percentage: 3.15, rate_fixed: 0.10, category: "standard" },
  { program_name: "Standard", card_type: "Consumer Credit World High Value", rate_percentage: 3.15, rate_fixed: 0.10, category: "standard" },
  { program_name: "Standard", card_type: "Consumer Credit World Elite", rate_percentage: 3.15, rate_fixed: 0.10, category: "standard" },
  { program_name: "Supermarket Base", card_type: "Consumer Credit Core", rate_percentage: 1.45, rate_fixed: 0.10, category: "supermarket" },
  { program_name: "Supermarket Base", card_type: "Consumer Credit Enhanced Value", rate_percentage: 1.60, rate_fixed: 0.10, category: "supermarket" },
  { program_name: "Supermarket Base", card_type: "Consumer Credit World", rate_percentage: 1.70, rate_fixed: 0.10, category: "supermarket" },
  { program_name: "Supermarket Base", card_type: "Consumer Credit World High Value", rate_percentage: 2.10, rate_fixed: 0.10, category: "supermarket" },
  { program_name: "Supermarket Base", card_type: "Consumer Credit World Elite", rate_percentage: 2.10, rate_fixed: 0.10, category: "supermarket" },
  { program_name: "T&E", card_type: "Consumer Credit World", rate_percentage: 2.25, rate_fixed: 0.10, category: "travel" },
  { program_name: "T&E", card_type: "Consumer Credit World High Value", rate_percentage: 2.55, rate_fixed: 0.10, category: "travel" },
  { program_name: "T&E", card_type: "Consumer Credit World Elite", rate_percentage: 2.55, rate_fixed: 0.10, category: "travel" },
  { program_name: "Utilities", card_type: "Consumer Credit Core", rate_percentage: 0.00, rate_fixed: 0.75, category: "utility" },
  { program_name: "Utilities", card_type: "Consumer Credit Enhanced Value", rate_percentage: 0.00, rate_fixed: 0.75, category: "utility" },
  { program_name: "Utilities", card_type: "Consumer Credit World", rate_percentage: 0.00, rate_fixed: 0.75, category: "utility" },
  { program_name: "Utilities", card_type: "Consumer Credit World High Value", rate_percentage: 0.00, rate_fixed: 0.75, category: "utility" },
  { program_name: "Utilities", card_type: "Consumer Credit World Elite", rate_percentage: 0.00, rate_fixed: 0.75, category: "utility" },
  
  // Consumer Debit - Card Not Present (Páginas 4-5 do documento Mastercard)
  { program_name: "Charities", card_type: "Consumer Debit", rate_percentage: 1.45, rate_fixed: 0.15, category: "charity" },
  { program_name: "Emerging Markets", card_type: "Consumer Debit", rate_percentage: 0.80, rate_fixed: 0.25, category: "emerging" },
  { program_name: "Emerging Markets (Education/Govt)", card_type: "Consumer Debit", rate_percentage: 0.65, rate_fixed: 0.15, category: "government" },
  { program_name: "Full UCAF", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15, category: "ecommerce" },
  { program_name: "Key-Entered", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15, category: "ecommerce" },
  { program_name: "Lodging and Auto Rental", card_type: "Consumer Debit", rate_percentage: 1.15, rate_fixed: 0.15, category: "travel" },
  { program_name: "Merchant UCAF", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15, category: "ecommerce" },
  { program_name: "Merit I", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15, category: "merit" },
  { program_name: "Merit I (Real Estate MCCs)", card_type: "Consumer Debit", rate_percentage: 0.80, rate_fixed: 0.25, category: "industry" },
  { program_name: "Merit I (Consumer Loan MCCs)", card_type: "Consumer Debit", rate_percentage: 0.80, rate_fixed: 0.25, category: "industry" },
  { program_name: "Merit III Base", card_type: "Consumer Debit", rate_percentage: 1.05, rate_fixed: 0.15, category: "merit" },
  { program_name: "Merit III Tier 1", card_type: "Consumer Debit", rate_percentage: 0.70, rate_fixed: 0.15, category: "merit" },
  { program_name: "Merit III Tier 2", card_type: "Consumer Debit", rate_percentage: 0.83, rate_fixed: 0.15, category: "merit" },
  { program_name: "Merit III Tier 3", card_type: "Consumer Debit", rate_percentage: 0.95, rate_fixed: 0.15, category: "merit" },
  { program_name: "Passenger Transport", card_type: "Consumer Debit", rate_percentage: 1.60, rate_fixed: 0.15, category: "transport" },
  { program_name: "Payment Transaction", card_type: "Consumer Debit", rate_percentage: 0.19, rate_fixed: 0.53, category: "payment" },
  { program_name: "Payment Transaction (Gaming)", card_type: "Consumer Debit", rate_percentage: 0.00, rate_fixed: 0.10, category: "gaming" },
  { program_name: "Petroleum CAT/AFD", card_type: "Consumer Debit", rate_percentage: 0.70, rate_fixed: 0.17, category: "fuel" },
  { program_name: "Petroleum Service Station", card_type: "Consumer Debit", rate_percentage: 0.70, rate_fixed: 0.17, category: "fuel" },
  { program_name: "Restaurant", card_type: "Consumer Debit", rate_percentage: 1.19, rate_fixed: 0.10, category: "restaurant" },
  { program_name: "Service Industries", card_type: "Consumer Debit", rate_percentage: 1.15, rate_fixed: 0.05, category: "industry" },
  { program_name: "Small Ticket Base", card_type: "Consumer Debit", rate_percentage: 1.55, rate_fixed: 0.04, category: "small_ticket" },
  { program_name: "Small Ticket Tier 1", card_type: "Consumer Debit", rate_percentage: 1.30, rate_fixed: 0.03, category: "small_ticket" },
  { program_name: "Standard", card_type: "Consumer Debit", rate_percentage: 1.90, rate_fixed: 0.25, category: "standard" },
  { program_name: "Supermarket Base", card_type: "Consumer Debit", rate_percentage: 1.05, rate_fixed: 0.15, category: "supermarket" },
  { program_name: "Utilities", card_type: "Consumer Debit", rate_percentage: 0.00, rate_fixed: 0.65, category: "utility" },
  
  // Consumer Prepaid - Card Not Present (Páginas 4-5 do documento Mastercard)
  { program_name: "Charities", card_type: "Consumer Prepaid", rate_percentage: 1.45, rate_fixed: 0.15, category: "charity" },
  { program_name: "Emerging Markets", card_type: "Consumer Prepaid", rate_percentage: 0.80, rate_fixed: 0.25, category: "emerging" },
  { program_name: "Emerging Markets (Education/Govt)", card_type: "Consumer Prepaid", rate_percentage: 0.65, rate_fixed: 0.15, category: "government" },
  { program_name: "Full UCAF", card_type: "Consumer Prepaid", rate_percentage: 1.76, rate_fixed: 0.20, category: "ecommerce" },
  { program_name: "Key-Entered", card_type: "Consumer Prepaid", rate_percentage: 1.76, rate_fixed: 0.20, category: "ecommerce" },
  { program_name: "Lodging and Auto Rental", card_type: "Consumer Prepaid", rate_percentage: 1.15, rate_fixed: 0.15, category: "travel" },
  { program_name: "Merchant UCAF", card_type: "Consumer Prepaid", rate_percentage: 1.76, rate_fixed: 0.20, category: "ecommerce" },
  { program_name: "Merit I", card_type: "Consumer Prepaid", rate_percentage: 1.76, rate_fixed: 0.20, category: "merit" },
  { program_name: "Merit I (Real Estate MCCs)", card_type: "Consumer Prepaid", rate_percentage: 0.80, rate_fixed: 0.25, category: "industry" },
  { program_name: "Merit I (Consumer Loan MCCs)", card_type: "Consumer Prepaid", rate_percentage: 0.80, rate_fixed: 0.25, category: "industry" },
  { program_name: "Merit III Base", card_type: "Consumer Prepaid", rate_percentage: 1.15, rate_fixed: 0.15, category: "merit" },
  { program_name: "Merit III Tier 1", card_type: "Consumer Prepaid", rate_percentage: 0.70, rate_fixed: 0.15, category: "merit" },
  { program_name: "Merit III Tier 2", card_type: "Consumer Prepaid", rate_percentage: 0.83, rate_fixed: 0.15, category: "merit" },
  { program_name: "Merit III Tier 3", card_type: "Consumer Prepaid", rate_percentage: 0.95, rate_fixed: 0.15, category: "merit" },
  { program_name: "Passenger Transport", card_type: "Consumer Prepaid", rate_percentage: 1.60, rate_fixed: 0.15, category: "transport" },
  { program_name: "Payment Transaction", card_type: "Consumer Prepaid", rate_percentage: 0.19, rate_fixed: 0.53, category: "payment" },
  { program_name: "Payment Transaction (Gaming)", card_type: "Consumer Prepaid", rate_percentage: 0.00, rate_fixed: 0.10, category: "gaming" },
  { program_name: "Petroleum CAT/AFD", card_type: "Consumer Prepaid", rate_percentage: 0.70, rate_fixed: 0.17, category: "fuel" },
  { program_name: "Petroleum Service Station", card_type: "Consumer Prepaid", rate_percentage: 0.70, rate_fixed: 0.17, category: "fuel" },
  { program_name: "Restaurant", card_type: "Consumer Prepaid", rate_percentage: 1.19, rate_fixed: 0.10, category: "restaurant" },
  { program_name: "Service Industries", card_type: "Consumer Prepaid", rate_percentage: 1.15, rate_fixed: 0.05, category: "industry" },
  { program_name: "Small Ticket Base", card_type: "Consumer Prepaid", rate_percentage: 1.55, rate_fixed: 0.04, category: "small_ticket" },
  { program_name: "Small Ticket Tier 1", card_type: "Consumer Prepaid", rate_percentage: 1.30, rate_fixed: 0.03, category: "small_ticket" },
  { program_name: "Standard", card_type: "Consumer Prepaid", rate_percentage: 1.90, rate_fixed: 0.25, category: "standard" },
  { program_name: "Supermarket Base", card_type: "Consumer Prepaid", rate_percentage: 1.05, rate_fixed: 0.15, category: "supermarket" },
  { program_name: "Utilities", card_type: "Consumer Prepaid", rate_percentage: 0.00, rate_fixed: 0.65, category: "utility" },
  
  // Commercial Large Ticket (Página 9 do documento Mastercard)
  { program_name: "Large Ticket 1 ($10K-$25K)", card_type: "Commercial", rate_percentage: 1.20, rate_fixed: 0.00, category: "large_ticket" },
  { program_name: "Large Ticket 2 ($25K-$100K)", card_type: "Commercial", rate_percentage: 1.00, rate_fixed: 0.00, category: "large_ticket" },
  { program_name: "Large Ticket 3 ($100K-$500K)", card_type: "Commercial", rate_percentage: 0.90, rate_fixed: 0.00, category: "large_ticket" },
  { program_name: "Large Ticket 4 ($500K-$1M)", card_type: "Commercial", rate_percentage: 0.80, rate_fixed: 0.00, category: "large_ticket" },
  { program_name: "Large Ticket 5 (>$1M)", card_type: "Commercial", rate_percentage: 0.70, rate_fixed: 0.00, category: "large_ticket" },
  { program_name: "Commercial Bill Pay Standard", card_type: "Commercial", rate_percentage: 2.50, rate_fixed: 0.10, category: "bill_payment" },
];

// ==================== LISTA DE MCCs ====================
export const MCC_LIST = [
  "0742", "1799", "4121", "4789", "5013", "5045", "5046", "5051", "5065", "5072",
  "5085", "5193", "5251", "5310", "5411", "5451", "5462", "5499", "5533", "5621",
  "5655", "5691", "5698", "5732", "5811", "5812", "5817", "5921", "5940", "5941",
  "5942", "5943", "5970", "5977", "5995", "5996", "7277", "7299", "7311", "7349",
  "7392", "7399", "7523", "7999", "8071", "8099", "8220", "8351", "8641", "8999",
  "9950"
];

// ==================== FUNÇÕES DE CÁLCULO DE MÉDIAS ====================

// Função auxiliar para calcular estatísticas de um array de taxas
const calculateStats = (rates) => {
  if (!rates || rates.length === 0) {
    return { low: { percentage: 0, fixed: 0 }, avg: { percentage: 0, fixed: 0 }, high: { percentage: 0, fixed: 0 } };
  }
  
  const percentages = rates.map(r => r.rate_percentage);
  const fixeds = rates.map(r => r.rate_fixed);
  
  return {
    low: { 
      percentage: Math.min(...percentages), 
      fixed: Math.min(...fixeds) 
    },
    avg: { 
      percentage: percentages.reduce((a, b) => a + b, 0) / percentages.length, 
      fixed: fixeds.reduce((a, b) => a + b, 0) / fixeds.length 
    },
    high: { 
      percentage: Math.max(...percentages), 
      fixed: Math.max(...fixeds) 
    }
  };
};

// Calcular resumo geral de interchange (compatibilidade com código existente)
export const calculateInterchangeSummary = () => {
  const visaStats = calculateStats(VISA_INTERCHANGE_RATES);
  const masterStats = calculateStats(MASTERCARD_INTERCHANGE_RATES);
  
  return {
    visa: visaStats,
    master: masterStats,
    combined: {
      low: { 
        percentage: (visaStats.low.percentage + masterStats.low.percentage) / 2, 
        fixed: (visaStats.low.fixed + masterStats.low.fixed) / 2 
      },
      avg: { 
        percentage: (visaStats.avg.percentage + masterStats.avg.percentage) / 2, 
        fixed: (visaStats.avg.fixed + masterStats.avg.fixed) / 2 
      },
      high: { 
        percentage: (visaStats.high.percentage + masterStats.high.percentage) / 2, 
        fixed: (visaStats.high.fixed + masterStats.high.fixed) / 2 
      }
    }
  };
};

// ==================== MÉDIAS PONDERADAS POR CATEGORIA ====================

// Definição das categorias de médias ponderadas disponíveis
export const WEIGHTED_AVERAGE_CATEGORIES = {
  // Nível 1: Por Bandeira
  brand: {
    id: 'brand',
    name: 'Por Bandeira',
    description: 'Médias gerais por bandeira de cartão',
    options: [
      { id: 'visa_all', name: 'Visa - Todas as Taxas', brand: 'visa', filter: () => true },
      { id: 'master_all', name: 'Mastercard - Todas as Taxas', brand: 'mastercard', filter: () => true },
      { id: 'combined_all', name: 'Combinado (Visa + Master)', brand: 'combined', filter: () => true },
    ]
  },
  
  // Nível 2: Por Tipo de Cartão
  cardType: {
    id: 'cardType',
    name: 'Por Tipo de Cartão',
    description: 'Médias por tipo específico de cartão',
    options: [
      { id: 'visa_credit', name: 'Visa Crédito', brand: 'visa', filter: (r) => r.card_type.includes('Consumer Credit') },
      { id: 'visa_debit', name: 'Visa Débito', brand: 'visa', filter: (r) => r.card_type.includes('Consumer Debit') },
      { id: 'visa_prepaid', name: 'Visa Pré-pago', brand: 'visa', filter: (r) => r.card_type.includes('Consumer Prepaid') },
      { id: 'master_credit', name: 'Mastercard Crédito', brand: 'mastercard', filter: (r) => r.card_type.includes('Consumer Credit') },
      { id: 'master_debit', name: 'Mastercard Débito', brand: 'mastercard', filter: (r) => r.card_type.includes('Consumer Debit') },
      { id: 'master_prepaid', name: 'Mastercard Pré-pago', brand: 'mastercard', filter: (r) => r.card_type.includes('Consumer Prepaid') },
    ]
  },
  
  // Nível 3: Por Tier Mastercard
  masterTier: {
    id: 'masterTier',
    name: 'Mastercard por Tier',
    description: 'Médias por tier de cartão Mastercard',
    options: [
      { id: 'master_core', name: 'Mastercard Core', brand: 'mastercard', filter: (r) => r.card_type.includes('Core') },
      { id: 'master_enhanced', name: 'Mastercard Enhanced Value', brand: 'mastercard', filter: (r) => r.card_type.includes('Enhanced Value') },
      { id: 'master_world', name: 'Mastercard World', brand: 'mastercard', filter: (r) => r.card_type === 'Consumer Credit World' },
      { id: 'master_world_high', name: 'Mastercard World High Value', brand: 'mastercard', filter: (r) => r.card_type.includes('World High Value') },
      { id: 'master_world_elite', name: 'Mastercard World Elite', brand: 'mastercard', filter: (r) => r.card_type.includes('World Elite') },
    ]
  },
  
  // Nível 4: Por Segmento de Indústria
  industry: {
    id: 'industry',
    name: 'Por Segmento',
    description: 'Médias por segmento de mercado',
    options: [
      { id: 'ecommerce', name: 'E-commerce Geral', brand: 'combined', filter: (r) => r.category === 'ecommerce' },
      { id: 'travel', name: 'Viagens e Hotelaria', brand: 'combined', filter: (r) => r.category === 'travel' },
      { id: 'restaurant', name: 'Restaurantes', brand: 'combined', filter: (r) => r.category === 'restaurant' },
      { id: 'supermarket', name: 'Supermercados', brand: 'combined', filter: (r) => r.category === 'supermarket' },
      { id: 'utility', name: 'Utilidades', brand: 'combined', filter: (r) => r.category === 'utility' },
      { id: 'recurring', name: 'Pagamentos Recorrentes', brand: 'combined', filter: (r) => r.category === 'recurring' },
      { id: 'charity', name: 'Caridade/Doações', brand: 'combined', filter: (r) => r.category === 'charity' },
      { id: 'government', name: 'Governo/Setor Público', brand: 'combined', filter: (r) => r.category === 'government' },
    ]
  },
  
  // Nível 5: Transações de Grande Valor
  largeTicket: {
    id: 'largeTicket',
    name: 'Transações de Grande Valor',
    description: 'Taxas para transações acima de $10.000',
    options: [
      { id: 'visa_large', name: 'Visa Large Purchase', brand: 'visa', filter: (r) => r.card_type === 'Large Purchase Advantage' },
      { id: 'master_large', name: 'Mastercard Large Ticket', brand: 'mastercard', filter: (r) => r.category === 'large_ticket' },
      { id: 'combined_large', name: 'Combinado Large Ticket', brand: 'combined', filter: (r) => r.category === 'large_ticket' },
    ]
  },
  
  // Nível 6: Cartões Empresariais
  business: {
    id: 'business',
    name: 'Cartões Empresariais',
    description: 'Taxas para cartões corporativos e de negócios',
    options: [
      { id: 'visa_business', name: 'Visa Business Debit', brand: 'visa', filter: (r) => r.card_type.includes('Business') },
      { id: 'master_commercial', name: 'Mastercard Commercial', brand: 'mastercard', filter: (r) => r.card_type === 'Commercial' },
    ]
  }
};

// Função para calcular média ponderada de uma opção específica
export const calculateWeightedAverage = (optionId) => {
  let allRates = [];
  
  // Encontrar a opção
  for (const category of Object.values(WEIGHTED_AVERAGE_CATEGORIES)) {
    const option = category.options.find(o => o.id === optionId);
    if (option) {
      if (option.brand === 'visa') {
        allRates = VISA_INTERCHANGE_RATES.filter(option.filter);
      } else if (option.brand === 'mastercard') {
        allRates = MASTERCARD_INTERCHANGE_RATES.filter(option.filter);
      } else if (option.brand === 'combined') {
        const visaFiltered = VISA_INTERCHANGE_RATES.filter(option.filter);
        const masterFiltered = MASTERCARD_INTERCHANGE_RATES.filter(option.filter);
        allRates = [...visaFiltered, ...masterFiltered];
      }
      break;
    }
  }
  
  return calculateStats(allRates);
};

// Obter todas as opções de médias ponderadas como lista plana
export const getAllWeightedAverageOptions = () => {
  const options = [];
  
  for (const [categoryKey, category] of Object.entries(WEIGHTED_AVERAGE_CATEGORIES)) {
    for (const option of category.options) {
      const stats = calculateWeightedAverage(option.id);
      options.push({
        ...option,
        categoryId: categoryKey,
        categoryName: category.name,
        stats
      });
    }
  }
  
  return options;
};

// Exportar resumo calculado
export const INTERCHANGE_SUMMARY = calculateInterchangeSummary();