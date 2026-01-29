// Dados de Interchange Card Not Present - USA
// Baseado nos documentos oficiais da Visa e Mastercard

export const VISA_INTERCHANGE_RATES = [
  // Consumer Credit - Card Not Present
  { program_name: "Recurring Tier 1", card_type: "Consumer Credit", rate_percentage: 1.33, rate_fixed: 0.05 },
  { program_name: "Recurring Tier 2", card_type: "Consumer Credit", rate_percentage: 1.43, rate_fixed: 0.05 },
  { program_name: "Recurring Tier 3", card_type: "Consumer Credit", rate_percentage: 1.53, rate_fixed: 0.05 },
  { program_name: "Recurring", card_type: "Consumer Credit", rate_percentage: 1.53, rate_fixed: 0.05 },
  { program_name: "Product 1", card_type: "Consumer Credit", rate_percentage: 1.89, rate_fixed: 0.10 },
  { program_name: "Advertising 1", card_type: "Consumer Credit", rate_percentage: 1.65, rate_fixed: 0.10 },
  { program_name: "Insurance 1", card_type: "Consumer Credit", rate_percentage: 1.53, rate_fixed: 0.05 },
  { program_name: "Education 1", card_type: "Consumer Credit", rate_percentage: 1.53, rate_fixed: 0.05 },
  { program_name: "Healthcare 1", card_type: "Consumer Credit", rate_percentage: 1.53, rate_fixed: 0.05 },
  { program_name: "Real Estate 1", card_type: "Consumer Credit", rate_percentage: 1.53, rate_fixed: 0.05 },
  { program_name: "Services 1", card_type: "Consumer Credit", rate_percentage: 1.65, rate_fixed: 0.10 },
  { program_name: "Travel 1", card_type: "Consumer Credit", rate_percentage: 1.75, rate_fixed: 0.10 },
  { program_name: "Restaurant 1", card_type: "Consumer Credit", rate_percentage: 2.20, rate_fixed: 0.08 },
  { program_name: "Taxi 1", card_type: "Consumer Credit", rate_percentage: 2.20, rate_fixed: 0.08 },
  { program_name: "Charity 1", card_type: "Consumer Credit", rate_percentage: 1.35, rate_fixed: 0.05 },
  { program_name: "Government 1", card_type: "Consumer Credit", rate_percentage: 1.55, rate_fixed: 0.10 },
  { program_name: "CPS/Card Not Present", card_type: "Consumer Credit", rate_percentage: 1.65, rate_fixed: 0.15 },
  { program_name: "CPS/e-Commerce Basic", card_type: "Consumer Credit", rate_percentage: 1.65, rate_fixed: 0.15 },
  { program_name: "CPS/e-Commerce Preferred Retail", card_type: "Consumer Credit", rate_percentage: 1.60, rate_fixed: 0.15 },
  { program_name: "CPS/Utility", card_type: "Consumer Credit", rate_percentage: 0.00, rate_fixed: 0.75 },
  { program_name: "Non-Qualified Consumer Credit", card_type: "Consumer Credit", rate_percentage: 3.15, rate_fixed: 0.10 },
  { program_name: "EIRF", card_type: "Consumer Credit", rate_percentage: 1.75, rate_fixed: 0.20 },
  { program_name: "Standard", card_type: "Consumer Credit", rate_percentage: 1.90, rate_fixed: 0.25 },
  
  // Consumer Debit - Card Not Present
  { program_name: "CPS/Retail 2 Card Not Present", card_type: "Consumer Debit", rate_percentage: 0.65, rate_fixed: 0.15 },
  { program_name: "CPS/Card Not Present", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15 },
  { program_name: "CPS/e-Commerce Basic", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15 },
  { program_name: "EIRF", card_type: "Consumer Debit", rate_percentage: 1.75, rate_fixed: 0.20 },
  { program_name: "Standard", card_type: "Consumer Debit", rate_percentage: 1.90, rate_fixed: 0.25 },
  
  // Consumer Prepaid - Card Not Present
  { program_name: "CPS/Retail 2 Card Not Present", card_type: "Consumer Prepaid", rate_percentage: 0.65, rate_fixed: 0.15 },
  { program_name: "CPS/Card Not Present", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20 },
  { program_name: "CPS/e-Commerce Basic", card_type: "Consumer Prepaid", rate_percentage: 1.75, rate_fixed: 0.20 },
  { program_name: "EIRF", card_type: "Consumer Prepaid", rate_percentage: 1.80, rate_fixed: 0.20 },
  { program_name: "Standard", card_type: "Consumer Prepaid", rate_percentage: 1.90, rate_fixed: 0.25 },
];

export const MASTERCARD_INTERCHANGE_RATES = [
  // Consumer Credit - Card Not Present
  { program_name: "Full UCAF", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.10 },
  { program_name: "Key-entered", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.10 },
  { program_name: "Merchant UCAF", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.10 },
  { program_name: "Merit I", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.10 },
  { program_name: "Merit I (Insurance)", card_type: "Consumer Credit Core", rate_percentage: 1.43, rate_fixed: 0.05 },
  { program_name: "Merit I (Real Estate)", card_type: "Consumer Credit Core", rate_percentage: 1.43, rate_fixed: 0.05 },
  { program_name: "Merit III Base", card_type: "Consumer Credit Core", rate_percentage: 1.65, rate_fixed: 0.10 },
  { program_name: "Merit III Tier 1", card_type: "Consumer Credit Core", rate_percentage: 1.43, rate_fixed: 0.10 },
  { program_name: "Merit III Tier 2", card_type: "Consumer Credit Core", rate_percentage: 1.48, rate_fixed: 0.10 },
  { program_name: "Merit III Tier 3", card_type: "Consumer Credit Core", rate_percentage: 1.55, rate_fixed: 0.10 },
  { program_name: "Small Ticket Card-Not-Present", card_type: "Consumer Credit Core", rate_percentage: 1.95, rate_fixed: 0.02 },
  { program_name: "Standard", card_type: "Consumer Credit Core", rate_percentage: 3.15, rate_fixed: 0.10 },
  
  { program_name: "Full UCAF", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.10 },
  { program_name: "Key-entered", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.10 },
  { program_name: "Merchant UCAF", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.10 },
  { program_name: "Merit I", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.10 },
  { program_name: "Merit III Base", card_type: "Consumer Credit World", rate_percentage: 1.90, rate_fixed: 0.10 },
  { program_name: "Small Ticket Card-Not-Present", card_type: "Consumer Credit World", rate_percentage: 2.20, rate_fixed: 0.02 },
  { program_name: "Standard", card_type: "Consumer Credit World", rate_percentage: 3.15, rate_fixed: 0.10 },
  
  { program_name: "Full UCAF", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.10 },
  { program_name: "Key-entered", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.10 },
  { program_name: "Merchant UCAF", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.10 },
  { program_name: "Merit I", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.10 },
  { program_name: "Merit III Base", card_type: "Consumer Credit World Elite", rate_percentage: 2.30, rate_fixed: 0.10 },
  { program_name: "Small Ticket Card-Not-Present", card_type: "Consumer Credit World Elite", rate_percentage: 2.60, rate_fixed: 0.02 },
  { program_name: "Standard", card_type: "Consumer Credit World Elite", rate_percentage: 3.15, rate_fixed: 0.10 },
  
  // Consumer Debit - Card Not Present
  { program_name: "Full UCAF", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15 },
  { program_name: "Key-Entered", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15 },
  { program_name: "Merchant UCAF", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15 },
  { program_name: "Merit I", card_type: "Consumer Debit", rate_percentage: 1.65, rate_fixed: 0.15 },
  { program_name: "Merit III Base", card_type: "Consumer Debit", rate_percentage: 1.05, rate_fixed: 0.15 },
  { program_name: "Standard", card_type: "Consumer Debit", rate_percentage: 1.90, rate_fixed: 0.25 },
  
  // Consumer Prepaid - Card Not Present
  { program_name: "Full UCAF", card_type: "Consumer Prepaid", rate_percentage: 1.76, rate_fixed: 0.20 },
  { program_name: "Key-Entered", card_type: "Consumer Prepaid", rate_percentage: 1.76, rate_fixed: 0.20 },
  { program_name: "Merchant UCAF", card_type: "Consumer Prepaid", rate_percentage: 1.76, rate_fixed: 0.20 },
  { program_name: "Merit I", card_type: "Consumer Prepaid", rate_percentage: 1.76, rate_fixed: 0.20 },
  { program_name: "Merit III Base", card_type: "Consumer Prepaid", rate_percentage: 1.15, rate_fixed: 0.15 },
  { program_name: "Standard", card_type: "Consumer Prepaid", rate_percentage: 1.90, rate_fixed: 0.25 },
];

// Calcular resumos de interchange
export const calculateInterchangeSummary = () => {
  const visaRates = VISA_INTERCHANGE_RATES.map(r => r.rate_percentage);
  const visaFixed = VISA_INTERCHANGE_RATES.map(r => r.rate_fixed);
  const masterRates = MASTERCARD_INTERCHANGE_RATES.map(r => r.rate_percentage);
  const masterFixed = MASTERCARD_INTERCHANGE_RATES.map(r => r.rate_fixed);

  const visa = {
    low: { percentage: Math.min(...visaRates), fixed: Math.min(...visaFixed) },
    avg: { percentage: visaRates.reduce((a, b) => a + b, 0) / visaRates.length, fixed: visaFixed.reduce((a, b) => a + b, 0) / visaFixed.length },
    high: { percentage: Math.max(...visaRates), fixed: Math.max(...visaFixed) }
  };

  const master = {
    low: { percentage: Math.min(...masterRates), fixed: Math.min(...masterFixed) },
    avg: { percentage: masterRates.reduce((a, b) => a + b, 0) / masterRates.length, fixed: masterFixed.reduce((a, b) => a + b, 0) / masterFixed.length },
    high: { percentage: Math.max(...masterRates), fixed: Math.max(...masterFixed) }
  };

  const combined = {
    low: { 
      percentage: (visa.low.percentage + master.low.percentage) / 2, 
      fixed: (visa.low.fixed + master.low.fixed) / 2 
    },
    avg: { 
      percentage: (visa.avg.percentage + master.avg.percentage) / 2, 
      fixed: (visa.avg.fixed + master.avg.fixed) / 2 
    },
    high: { 
      percentage: (visa.high.percentage + master.high.percentage) / 2, 
      fixed: (visa.high.fixed + master.high.fixed) / 2 
    }
  };

  return { visa, master, combined };
};

export const MCC_LIST = [
  "0742", "1799", "4121", "4789", "5013", "5045", "5046", "5051", "5065", "5072",
  "5085", "5193", "5251", "5310", "5411", "5451", "5462", "5499", "5533", "5621",
  "5655", "5691", "5698", "5732", "5811", "5812", "5817", "5921", "5940", "5941",
  "5942", "5943", "5970", "5977", "5995", "5996", "7277", "7299", "7311", "7349",
  "7392", "7399", "7523", "7999", "8071", "8099", "8220", "8351", "8641", "8999",
  "9950"
];

export const INTERCHANGE_SUMMARY = calculateInterchangeSummary();