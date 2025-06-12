import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon";
import { ScrollArea } from "@/components/common/ScrollArea";
import cn from "@/lib/utils";
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
import Link from "next/link";
import SortableItem from "./SortableItem";
import useSelectedCard from "../_hooks/useSelectedCard";
import MenuCard from "./MenuCard";

const category = ["전체", "스테이크", "파스타", "라멘", "볶음밥"];

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
];

interface IProps {
  storeId: string;
}

export default function MenuList({ storeId }: IProps) {
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
    <div className="h-full pt-6 pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ResponsiveButton
            color="grey"
            responsiveButtons={{
              lg: {
                buttonSize: "md",
                className:
                  "!text-[15px] !rounded-[12px] !p-0 !w-[32px] !h-[32px]",
              },
            }}
          >
            <SettingsIcon size={18} strokeWidth={1.5} />
          </ResponsiveButton>
          {category.map((cat) => (
            <ResponsiveButton
              key={cat}
              variant={active === cat ? "default" : "outline"}
              color={active === cat ? "black" : "grey"}
              responsiveButtons={{
                lg: {
                  buttonSize: "md",
                  className: cn(
                    "h-10 !text-[15px]",
                    active === cat ? "border-black" : "border-gray-300"
                  ),
                },
              }}
              onClick={() => setActive(cat)}
            >
              {cat}
            </ResponsiveButton>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {changeSort ? (
            <div className="flex items-center gap-2">
              <div className="center text-primary font-regular h-9 rounded-[8px] bg-[rgba(242,32,32,0.04)] px-4 text-sm">
                메뉴의 순서 변경은 메뉴를 꾹 누르신 후, 원하시는 자리로 메뉴를
                이동해주세요
              </div>
              <ResponsiveButton
                variant="outline"
                responsiveButtons={{
                  lg: { buttonSize: "sm" },
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
                className="flex items-center gap-2"
                onClick={() => setChangeSort(true)}
              >
                <ArrowDownUp
                  size={18}
                  strokeWidth={1.5}
                  className="text-gray-300"
                />
                <span className="text-lg text-gray-300">순서 변경</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2"
                onClick={handleDeleteSelected}
              >
                <Icon iconKey="trash" className="text-status-error" size={18} />
                <span className="text-status-error text-lg">삭제</span>
              </button>
            </>
          )}
        </div>
      </div>
      <ScrollArea className="mt-6 mb-4 h-full">
        <div className="grid grid-cols-4 gap-x-[32px] gap-y-[40px]">
          <DashedBorder
            layoutClassName="bg-gray-700 cursor-pointer"
            className="flex flex-col items-center justify-center gap-2"
          >
            <PlusIcon strokeWidth={1.5} />
            <span>메뉴 추가</span>
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
                  <Link
                    href={`/${storeId}/menu/${item.menuId}`}
                    key={item.menuId}
                  >
                    <SortableItem item={item} />
                  </Link>
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            dummy.map((item) => (
              <Link href={`/${storeId}/menu/${item.menuId}`} key={item.menuId}>
                <MenuCard
                  onToggle={toggle}
                  isSelected={isSelected(item)}
                  {...item}
                />
              </Link>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
