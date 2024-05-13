import { Box, Container, Flex, Input, SimpleGrid, Text, VStack, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error("Error fetching city data:", error));
  }, []);

  const filteredCities = searchTerm.length === 0 ? cities : cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="container.xl" p={0}>
      <Box as="header" bg="blue.500" color="white" py={4}>
        <Container maxW="container.xl">
          <Text fontSize="2xl" fontWeight="bold">NomadRank</Text>
        </Container>
      </Box>
      <Image src="/images/tropical-beach.jpg" alt="Tropical Beach" objectFit="cover" width="100%" height="300px" />
      <VStack spacing={4} p={4}>
        <Text fontSize="2xl" fontWeight="bold">Find the Best Cities for Digital Nomads</Text>
        <Text>Explore top-rated locations based on community feedback and data-driven insights.</Text>
        <Input placeholder="Search cities or countries" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </VStack>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} p={4}>
        {filteredCities.map(city => (
          <Box key={city.id} p={4} shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold">{city.name}</Text>
            <Text>{city.country}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;