import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BsCardChecklist } from "react-icons/bs";

export default function LeftBar() {
  const navigate = useNavigate();
  const params = useParams();
  const [section, setSection] = useState(params.section || "portfolio");

  console.log(params.section);

  useEffect(() => setSection(params.section), [params]);

  //다른 섹션을 클릭하면
  const handleDrawerClick = (event) => {
    const newSection = event.currentTarget.id;

    if (newSection === section) {
      return;
    } else {
      navigate(`/mypage/${newSection}`);
    }
  };

  const sections = [
    { id: "portfolio", text: "내 포트폴리오" },
    { id: "ledger", text: "가계부" },
    { id: "scrap", text: "스크랩" },
    { id: "comment", text: "댓글관리" },
    { id: "post", text: "게시물 관리" },
  ];

  return (
    <DrawerWrapper>
      {sections.map((sectionInfo) => (
        <ListButton
          key={sectionInfo.id}
          id={sectionInfo.id}
          className={section === sectionInfo.id ? "selected" : ""}
          onClick={handleDrawerClick}
        >
          <BsCardChecklist />
          <ListText>{sectionInfo.text}</ListText>
        </ListButton>
      ))}
    </DrawerWrapper>
  );
}

const DrawerWrapper = styled.div`
  width: 15rem;
  overflow: auto;
`;

const ListButton = styled.button`
  width: 100%;
  height: 3.6rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 1.3rem;
  cursor: pointer;
  border: none;
  &.selected {
    background-color: var(--light);
  }
`;

const ListText = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.9rem;
  font-size: 1.1rem;
`;
