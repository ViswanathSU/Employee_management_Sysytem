import api from "./api";

// 🔥 helper: always return array
const normalizeArray = (res) => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.result)) return res.result;
  if (typeof res === "object") return Object.values(res);
  return [];
};

export const getEmployeeAssetsMerged = async () => {
  // 1️⃣ Employees
  const empRes = await api.get("/employees");
  const employees = normalizeArray(empRes.data);

  // 2️⃣ Laptop allocations
  const laptopRes = await api.get("/assets/laptop");
  const laptops = normalizeArray(laptopRes.data);

  console.log("EMPLOYEES ✅", employees);
  console.log("LAPTOPS ✅", laptops);

  // 3️⃣ Map assets by employeeId
  const assetMap = {};

  laptops.forEach((l) => {
    if (!l.employeeId) return;

    if (!assetMap[l.employeeId]) {
      assetMap[l.employeeId] = [];
    }

    assetMap[l.employeeId].push({
      assetType: "Laptop",
      image: l.image,
    });
  });

  // 4️⃣ Merge employees + assets
  return employees.map((e) => ({
    id: e.id,               // REQUIRED by DataGrid
    employeeId: e.id,
    name: e.name,
    assets: assetMap[e.id] || [],
  }));
};
