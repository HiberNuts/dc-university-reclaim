import React from "react";
import Acordian from "../Accordian/Acordian";

const FaqHome = () => {
  return (
    <div className="w-full font-helvetica-neue my-[80px] flex flex-col items-center justify-center align-middle gap-4">
      <p className="text-center items-center flex justify-center align-middle text-[64px] font-[700] font-helvetica-neue">
        Frequently Asked Questions
      </p>
      <div className="w-[80%] md:mt-10 gap-4 grid">
        <Acordian
          title={"Why Are You Launching Shardeum University Now?"}
          desc={
            "Shardeum University is being launched in response to the significant growth and potential of the blockchain and Web3 ecosystem. Its aim is to address the scalability trilemma (scalability, security, decentralization) in blockchain, a key challenge that has limited Web3's capabilities compared to Web2. With Shardeum's innovative technology potentially overcoming these scalability issues, there's an urgent need to prepare the next generation for a rapidly evolving, decentralized ecosystem. Shardeum University will equip young professionals with essential Web3 knowledge and skills, positioning them to lead and innovate in this transformative industry."
          }
        />
        <Acordian
          title={"How Will Shardeum University Fulfill Its Mission?"}
          desc={
            "Shardeum University aims to revolutionize Web3 education by blending online and offline resources, catering to both beginners and advanced learners. The curriculum focuses on popularizing EVM and Solidity frameworks, while offering an in-depth understanding of Shardeum's unique EVM-based smart contract platform. Additionally, Shardeum is engaging in grassroots initiatives like workshops, seminars, and technical deep dives, similar to college ambassador programs by leading tech companies. These efforts are part of the broader 'Proof of Community' initiative, ensuring practical, hands-on learning experiences and full-stack courses covering various aspects of blockchain and Web3 development"
          }
        />
        <Acordian
          title={
            "Why Do You Think Future Developers and Entrepreneurs Should Consider Building in Web3 Rather Than Web2?"
          }
          desc={
            "Web3 offers a unique and forward-looking opportunity for future developers and entrepreneurs, aligning scalability and cost-effectiveness with Web2's user-friendliness and broad user base. Its key advantage is decentralization, eliminating intermediaries for direct, transparent user interactions and introducing innovative monetization models like tokenization. This shift empowers both developers and users, promoting equitable value distribution and asset control. Web3's data integrity and privacy features address trust issues in the digital landscape, while global accessibility opens up new markets. Unlike Web2's top-down approach, Web3's community-driven ethos provides a robust platform for product development and scaling, making it an ideal choice for those at the forefront of innovation and societal progress."
          }
        />
        <Acordian
          title={
            "Is There a Cost Associated with Joining Shardeum University, and What Are the Requirements to Access Its Learning Resources?"
          }
          desc={
            "Shardeum University offers all its educational resources for free, emphasizing the importance of accessible education in transforming lives and driving innovation in the Web3 space. There are no financial barriers to join; the main requirements are commitment, curiosity, and a passion for learning about blockchain and Web3. By making high-quality education available at no cost, Shardeum University aims to democratize learning in this advanced field, catering to both beginners and experienced developers. This initiative is part of Shardeum's commitment to nurturing talent with diverse perspectives and skills, offering a wealth of opportunities and knowledge in the dynamic world of Web3."
          }
        />
        <Acordian
          title={
            "Will Shardeum University Expand Its Resource Library in the Future, Considering Some Materials Are Currently Unavailable? "
          }
          desc={
            "Shardeum University is committed to continually expanding its educational resources to become a comprehensive platform in the Web3 space. While the current offerings lay a strong foundation, plans are in place to evolve and enrich the content to meet the diverse and growing needs of learners. This includes adding new materials, courses, workshops, and interactive experiences that keep pace with the latest advancements in blockchain and Web3 technologies. Shardeum University aims to be a dynamic hub of knowledge and skill development, ensuring that its learners have access to the most current and relevant information in the field. Students can look forward to an ongoing journey of learning and growth, with regular updates and new additions to the platform."
          }
        />
        <Acordian
          title={"How can I mint my NFT certificates?"}
          desc={
            "Upon 100% completion of a course, you will be able to mint your NFT certificates. These will be your on-chain credential for potential future employees, for your memories to look back to."
          }
        />
      </div>
    </div>
  );
};

export default FaqHome;
