export const fetchStats = async (sheetId) => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/pub?output=csv`;
  const response = await fetch(url);
  const text = await response.text();
  return parseCSV(text);
};

export const parseCSV = (csvText) => {
  const rows = csvText.split("\n");
  const headers = rows[0].split(",");
  return rows.slice(1).map((row) => {
    const values = row.split(",");
    return headers.reduce((acc, header, i) => {
      acc[header] = values[i].trim();
      return acc;
    }, {});
  });
};
