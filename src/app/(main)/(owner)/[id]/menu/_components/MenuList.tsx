"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon";
import { ScrollArea } from "@/components/common/ScrollArea";
import { ArrowDownUp, PlusIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import DashedBorder from "@/components/DashedBorder";
import useOverlay from "@/hooks/use-overlay";
import QueryProviders from "@/app/query-providers";
import Alert from "@/components/common/Alert/Alert";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import SortableItem from "./SortableItem";
import useSelectedCard from "../_hooks/useSelectedCard";
import MenuCard from "./MenuCard";
import useCategories from "../_hooks/useCategories";

const dummy: Menu[] = [
  {
    menuId: "694865267482835533",
    categoryId: "694865267482835533",
    name: "안심 스테이크1",
    description: "1++ 한우 안심을 사용합니다.",
    price: 34900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
  {
    menuId: "694865267482835534",
    categoryId: "694865267482835533",
    name: "안심 스테이크2",
    description: "1++ 한우 안심을 사용합니다.",
    price: 24900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
  {
    menuId: "694865267482835535",
    categoryId: "694865267482835533",
    name: "안심 스테이크3",
    description: "1++ 한우 안심을 사용합니다.",
    price: 14900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
  {
    menuId: "694865267482835536",
    categoryId: "694865267482835533",
    name: "안심 스테이크2",
    description: "1++ 한우 안심을 사용합니다.",
    price: 24900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
  {
    menuId: "694865267482835537",
    categoryId: "694865267482835533",
    name: "안심 스테이크3",
    description: "1++ 한우 안심을 사용합니다.",
    price: 14900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
];

interface IProps {
  storeId: string;
}

export default function MenuList({ storeId }: IProps) {
  const navigate = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const { categoryListQuery } = useCategories(storeId);
  const categories = categoryListQuery.data?.categories;

  const [changeSort, setChangeSort] = useState(false);
  const [active, setActive] = useState("전체");
  const [data, setData] = useState(dummy);

  const { isSelected, toggle } = useSelectedCard();
  const { open, close } = useOverlay();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDeleteSelected = () => {
    open(() => (
      <QueryProviders>
        <Alert onClose={close} onAction={() => {}} buttonText="삭제">
          선택한 메뉴를 삭제하시겠습니까?
        </Alert>
      </QueryProviders>
    ));
  };

  const handleSaveSort = () => {
    setChangeSort(false);
  };

  const handleDragEnd = ({ active: _active, over }: any) => {
    if (_active.id !== over?.id) {
      const oldIndex = data.findIndex((item) => item.menuId === _active.id);
      const newIndex = data.findIndex((item) => item.menuId === over?.id);
      const sorted = arrayMove(data, oldIndex, newIndex);
      setData(sorted);
    }
  };

  return (
    <div className="flex flex-1 flex-col pb-2 md:pt-4 lg:pt-6">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="scrollbar-hide md:overflow-none my-5 flex items-center gap-2 overflow-auto md:my-0 lg:gap-3">
          <ResponsiveButton
            color="grey"
            responsiveButtons={{
              lg: {
                buttonSize: "md",
                className:
                  "!text-[15px] !rounded-[12px] !p-0 !w-[32px] !h-[32px]",
              },
              md: {
                buttonSize: "sm",
                className: "h-8 !p-2 !rounded-[12px]",
              },
              sm: {
                buttonSize: "sm",
                className: "h-8 !p-2 !rounded-[12px]",
              },
            }}
            onClick={() => navigate.push(`/${storeId}/menu/category/add`)}
          >
            <SettingsIcon size={18} strokeWidth={1.5} />
          </ResponsiveButton>
          <ResponsiveButton
            variant={active === "전체" ? "default" : "outline"}
            color={active === "전체" ? "black" : "grey"}
            responsiveButtons={{
              lg: {
                buttonSize: "md",
                className: "h-10 !text-[15px]",
              },
              md: { buttonSize: "sm" },
              sm: { buttonSize: "sm" },
            }}
            commonClassName={
              active === "전체" ? "border-black" : "border-gray-300"
            }
            onClick={() => setActive("전체")}
          >
            전체
          </ResponsiveButton>
          {categories?.map((cat) => (
            <ResponsiveButton
              key={cat.categoryId}
              variant={active === cat.name ? "default" : "outline"}
              color={active === cat.name ? "black" : "grey"}
              responsiveButtons={{
                lg: {
                  buttonSize: "md",
                  className: "h-10 !text-[15px]",
                },
                md: { buttonSize: "sm" },
                sm: { buttonSize: "sm" },
              }}
              commonClassName={
                active === cat.name ? "border-black" : "border-gray-300"
              }
              onClick={() => setActive(cat.name)}
            >
              {cat.name}
            </ResponsiveButton>
          ))}
        </div>
        <div className="flex items-center justify-end gap-4 lg:gap-6">
          {changeSort ? (
            <div className="flex items-center gap-2">
              <div className="text-primary font-regular hidden h-9 items-center justify-center rounded-[8px] bg-[rgba(242,32,32,0.04)] px-4 text-sm lg:flex">
                메뉴의 순서 변경은 메뉴를 꾹 누르신 후, 원하시는 자리로 메뉴를
                이동해주세요
              </div>
              <ResponsiveButton
                variant="outline"
                responsiveButtons={{
                  lg: { buttonSize: "sm" },
                  md: { buttonSize: "sm" },
                  sm: { buttonSize: "sm" },
                }}
                onClick={handleSaveSort}
              >
                저장
              </ResponsiveButton>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="flex items-center gap-1 lg:gap-2"
                onClick={() => setChangeSort(true)}
              >
                <ArrowDownUp
                  size={18}
                  strokeWidth={1.5}
                  className="text-gray-300"
                />
                <span className="text-sm text-gray-300 lg:text-lg">
                  순서 변경
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 lg:gap-2"
                onClick={handleDeleteSelected}
              >
                <Icon iconKey="trash" className="text-status-error" size={18} />
                <span className="text-status-error text-sm lg:text-lg">
                  삭제
                </span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-4 mb-4 flex flex-1 flex-col lg:mt-6 lg:mb-0">
        <ScrollArea className="h-[550px] md:h-[385px] lg:h-[785px]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-[10px] md:gap-y-[16px] lg:gap-x-[32px] lg:gap-y-[40px]">
            <DashedBorder
              layoutClassName="bg-gray-700 cursor-pointer"
              radius={{
                lg: 24,
                md: 12,
                sm: 15,
              }}
            >
              <PlusIcon strokeWidth={1.5} />
              <span className="text-base">메뉴 추가</span>
            </DashedBorder>
            {changeSort ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={data.map((item) => item.menuId)}
                  strategy={rectSortingStrategy}
                >
                  {data.map((item) => (
                    <SortableItem
                      key={item.menuId}
                      item={item}
                      onClick={() =>
                        navigate.push(
                          `/${storeId}/menu/${item.menuId}?hideModal=${isMobile}`
                        )
                      }
                    />
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              dummy.map((item) => (
                <MenuCard
                  key={item.menuId}
                  onToggle={toggle}
                  isSelected={isSelected(item)}
                  onClick={() =>
                    navigate.push(
                      `/${storeId}/menu/${item.menuId}?hideModal=${isMobile}`
                    )
                  }
                  {...item}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
