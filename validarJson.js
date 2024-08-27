const jsonString = `[
     {
    "description": "A rich, full-bodied coffee with notes of dark chocolate and black cherry. Grown on the slopes of a mist-covered mountain in Central America.",
    "flavor_profile": "'Dark Chocolate', 'Black Cherry'",
    "id": "1",
    "image_url": "https://iili.io/H8Y78Qt.webp",
    "name": "Signature Blend",
    "price": "12.99",
    "region": "Central America",
    "roast_level": "3",
    "weight": "500"
  },
  {
    "description": "A smooth and bright coffee with a citrusy kick. Sourced from the rolling hills of Africa.",
    "flavor_profile": "'Citrus'",
    "id": "2",
    "image_url": "https://iili.io/H8Y7WEg.webp",
    "name": "Golden Sunrise",
    "price": "10.99",
    "region": "Africa",
    "roast_level": "2",
    "weight": "500"
  },
  {
    "description": "An earthy and complex coffee with notes of toasted nuts and caramel. Sustainably grown in the rainforests of South America.",
    "flavor_profile": "Citrus",
    "id": "3",
    "image_url": "https://iili.io/H8Y7kTN.webp",
    "name": "Rainforest Rhapsody",
    "price": "14.99",
    "region": "South America",
    "roast_level": "2",
    "weight": "500"
  },
  {
    "description": "A smooth and earthy blend with notes of cocoa and hazelnut.",
    "flavor_profile": "'Cocoa', 'Hazelnut'",
    "id": "4",
    "image_url": "https://iili.io/H8Y7X4a.webp",
    "name": "Harvest Moon",
    "price": "9.99",
    "region": "Central America",
    "roast_level": "3",
    "weight": "500"
  },
  {
    "description": "A bold and smoky blend with notes of dark chocolate and molasses.",
    "flavor_profile": "'Dark Chocolate', 'Molasses'",
    "id": "5",
    "image_url": "https://iili.io/H8Y7r4s.webp",
    "name": "Wildfire",
    "price": "12.99",
    "region": "Africa",
    "roast_level": "5",
    "weight": "500"
  },
  {
    "description": "A smooth and nutty coffee from the slopes of South America.",
    "flavor_profile": "'Nutty', 'Smooth'",
    "id": "6",
    "image_url": "https://iili.io/H8Y7gGn.webp",
    "name": "Walnut Wonder",
    "price": "9.99",
    "region": "South America",
    "roast_level": "3",
    "weight": "500"
  }
  ]`;
  
  try {
    const data = JSON.parse(jsonString);
    console.log('JSON válido:', data);
  } catch (error) {
    console.error('JSON no es válido:', error);
  }
  