import {
  Box,
  Grid,
  GridItem,
  Heading,
  Img,
  Text,
  Button,
} from '@chakra-ui/react';
import { swiftBountyUse } from '../../config/data';
import lock from '../../assets/goldenlock.jpeg';
import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <>
      <Box
        maxWidth={{ base: '100%', md: '90%', xl: '1200px' }}
        m="0 auto"
        p={{
          base: '7rem 1rem 1rem',
          md: '9rem 2rem 1rem',
          xl: '11rem 2rem 2rem',
        }}
      >
        <Heading as="h1" textAlign="center">
          About Us
        </Heading>
        <Box my="2rem">
          <Heading as="h6" fontSize="24px" fontWeight="600" my="1rem">
            Solstable Empowering Financial Freedom through Decentralized Lending
          </Heading>
          <Text as="p">
          At Solstable, our mission is to revolutionize lending by providing secure and transparent financial services on the Solana blockchain. We believe in empowering individuals worldwide with accessible lending opportunities, fostering financial inclusivity, and promoting the benefits of decentralized finance.
          </Text>
        </Box>

        <Box bgColor="brand.200" p="1.5rem" my="4rem" borderRadius="10px">
          <Heading as="h4" fontSize="28px" textAlign="center" my="1rem">
          Decentralized Lending Made Easy: Introducing  Solstable
          </Heading>

          <Text as="p" fontSize="15px" mt="2rem" fontWeight="600">
          Our team comprises blockchain experts, finance professionals, and software developers with a deep understanding of the industry. With a proven track record of innovation and expertise in blockchain technology, we are dedicated to delivering a cutting-edge lending platform that meets the evolving needs of our users.
          </Text>

          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            mt="1.5rem"
            gap="30px"
          >
            {swiftBountyUse.map((item) => (
              <GridItem key={item.id} textAlign="center">
                <Box textAlign="center">{item.icon}</Box>

                <Text as="p">
                  <b>{item.title}</b>
                </Text>

                <Text as="p" fontSize="14px">
                  {item.text}
                </Text>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          flexDir={{ base: 'column', md: 'row' }}
          my="3rem"
          bgColor="#fff"
          borderRadius="10px"
          p={{ base: '1rem 0.5rem', md: '1rem 2rem' }}
        >
          <Box width={{ base: '100%', md: "40%"}}>
            <Img src={lock} mx={{ base: 'auto', md: '0'}} alt="golden-lock" />
          </Box>
          <Box width={{ base: '100%', md: "60%" }}>
            <Heading as="h4" my="1rem">
            Unlocking Financial Opportunities with Solstable
            </Heading>
            <Text as="p" mb="2rem">
            We value our community and actively engage with our users. Through community-driven governance, user feedback, and collaborative initiatives, we foster an inclusive environment that encourages participation and growth. We are continuously evolving our lending application based on user needs and welcome input to shape the future of decentralized lending.
            </Text>

            <NavLink>
              <Button
                bgColor="primary.100"
                borderRadius="10px"
                color="#fff"
                p="1rem 2rem"
                _hover={{
                  opacity: '0.8',
                }}
              >
                GET LOAN
              </Button>
            </NavLink>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default About;
