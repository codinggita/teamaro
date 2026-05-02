/**
 * User mapping for the Vanguard AERO platform.
 * Maps GR Numbers (108601 - 108630) to Student Names.
 */
export const USER_MAP = {
  108601: { name: 'Devanshi', role: 'admin' },
  108602: { name: 'Zeel', role: 'member' },
  108603: { name: 'Jaydip', role: 'member' },
  108604: { name: 'Saptak', role: 'member' },
  108605: { name: 'Anshu', role: 'member' },
  108606: { name: 'Hashit Pandya', role: 'member' },
  108607: { name: 'Vishwa B', role: 'member' },
  108608: { name: 'Kreya', role: 'member' },
  108609: { name: 'Vidhi', role: 'member' },
  108610: { name: 'Priyansh', role: 'member' },
  108611: { name: 'Dhruv', role: 'member' },
  108612: { name: 'Dhvanit', role: 'member' },
  108613: { name: 'Harshil', role: 'member' },
  108614: { name: 'Devisingh', role: 'member' },
  108615: { name: 'Raunak Sahu', role: 'member' },
  108616: { name: 'Arpan', role: 'member' },
  108617: { name: 'Tapan', role: 'member' },
  108618: { name: 'Harshit Kumar', role: 'member' },
  108619: { name: 'Nishit', role: 'member' },
  108620: { name: 'Rani', role: 'member' },
  108621: { name: 'Chitt', role: 'member' },
  108622: { name: 'Nandini', role: 'member' },
  108623: { name: 'Drup', role: 'member' },
  108624: { name: 'Bhavya', role: 'member' },
  108625: { name: 'Parth', role: 'member' },
  108626: { name: 'Jilan', role: 'member' },
  108627: { name: 'Kahan', role: 'member' },
  108628: { name: 'Smit', role: 'member' },
  108629: { name: 'Sachin', role: 'member' },
  108630: { name: 'Arjun', role: 'admin' },
};

/**
 * Get user details by GR Number.
 */
export const getUserByGR = (grNumber) => {
  return USER_MAP[grNumber] || null;
};
