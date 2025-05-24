import React, { useState, useEffect, useCallback } from "react";
import { Input, Select, Button, Radio, Space, Table } from "antd";
import type { RadioChangeEvent } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSearchParams } from "react-router-dom";
import {
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  MinusCircleFilled,
} from "@ant-design/icons";

interface TagItem {
  id: number;
  text: string;
  isLocked: boolean;
}

interface FilterCondition {
  id: number;
  field: string | undefined;
  condition: string | undefined;
  value: string;
  operator: "AND" | "OR";
}

interface OutputData {
  key: React.Key;
  filter: string;
  tags: string;
}

interface FilterState {
  searchText: string;
  tags: TagItem[];
  filterConditions: FilterCondition[];
}

const Lesson6: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchText, setSearchText] = useState<string>("");
  const [tags, setTags] = useState<TagItem[]>([]);
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([
    {
      id: Date.now(),
      field: undefined,
      condition: undefined,
      value: "",
      operator: "AND",
    },
  ]);

  const [filterOutput, setFilterOutput] = useState<string | null>(null);
  const [tagsOutput, setTagsOutput] = useState<string | null>(null);

  const fieldOptions = [
    { value: "FIRST_NAME", label: "FIRST_NAME" },
    { value: "LAST_NAME", label: "LAST_NAME" },
    { value: "BIRTH_YEAR", label: "BIRTH_YEAR" },
    { value: "PERSONAL_NUMBER", label: "PERSONAL_NUMBER" },
    { value: "DATE_RECORDED", label: "DATE_RECORDED" },
    { value: "BUSINESS_AREA", label: "BUSINESS_AREA" },
  ];
  const conditionOptions = [
    { value: "IS", label: "IS" },
    { value: "IS_NOT", label: "IS_NOT" },
    { value: "CONTAINS", label: "CONTAINS" },
    { value: "NOT_CONTAINS", label: "NOT_CONTAINS" },
    { value: "GREATER_THAN", label: "GREATER_THAN" },
    { value: "LESS_THAN", label: "LESS_THAN" },
  ];

  const predefinedTagOptions = [
    { value: "kylapplikationer", label: "kylapplikationer" },
    { value: "inklusive", label: "inklusive" },
    { value: "komplett", label: "komplett" },
    { value: "program", label: "program" },
    { value: "vid", label: "vid" },
  ];

  const generateAndDisplayOutput = useCallback(
    (
      currentSearchText: string,
      currentTags: TagItem[],
      currentFilterConditions: FilterCondition[]
    ) => {
      const completedConditions = currentFilterConditions.filter(
        (condition) =>
          condition.field !== undefined &&
          condition.field !== null &&
          condition.field !== "" &&
          condition.condition !== undefined &&
          condition.condition !== null &&
          condition.condition !== "" &&
          condition.value !== "" &&
          condition.value !== null &&
          condition.value !== undefined
      );

      const filterWithConditionsOutput = completedConditions.map(
        (condition) => ({
          condition: condition.condition as string,
          field: condition.field as string,
          value: condition.value,
        })
      );

      const operatorsOrderOutput = completedConditions
        .slice(1)
        .map((condition) => condition.operator);

      const filterJson = {
        filterListId: 0,
        filterWithConditions: filterWithConditionsOutput,
        operatorsOrder: operatorsOrderOutput,
        freeText: currentSearchText,
      };

      const unlockedTags = currentTags.filter((tag) => !tag.isLocked);
      const tagsString = unlockedTags.map((tag) => tag.text).join(",");

      setFilterOutput(JSON.stringify(filterJson));
      setTagsOutput(tagsString);

      console.log("JSON Output:", filterJson);
    },
    []
  );

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      try {
        const decodedFilter = decodeURIComponent(filterParam);
        const parsedState: FilterState = JSON.parse(decodedFilter);

        const loadedSearchText = parsedState.searchText || "";
        const loadedTags = Array.isArray(parsedState.tags)
          ? parsedState.tags
          : [];

        const loadedFilterConditions = Array.isArray(
          parsedState.filterConditions
        )
          ? parsedState.filterConditions.map((cond) => ({
              id: cond.id || Date.now() + Math.random(),
              field:
                cond.field === "" ||
                cond.field === null ||
                cond.field === undefined
                  ? undefined
                  : cond.field,
              condition:
                cond.condition === "" ||
                cond.condition === null ||
                cond.condition === undefined
                  ? undefined
                  : cond.condition,
              operator:
                cond.operator === "AND" || cond.operator === "OR"
                  ? cond.operator
                  : "AND",
              value:
                cond.value === null || cond.value === undefined
                  ? ""
                  : cond.value,
            }))
          : [];

        setSearchText(loadedSearchText);
        setTags(loadedTags);

        setFilterConditions(loadedFilterConditions);

        if (
          loadedSearchText !== "" ||
          loadedTags.length > 0 ||
          loadedFilterConditions.some(
            (cond) =>
              cond.field !== undefined ||
              cond.condition !== undefined ||
              cond.value !== ""
          )
        ) {
          generateAndDisplayOutput(
            loadedSearchText,
            loadedTags,
            loadedFilterConditions
          );
        } else {
          setFilterOutput(null);
          setTagsOutput(null);
          if (loadedFilterConditions.length === 0) {
            setFilterConditions([
              {
                id: Date.now(),
                field: undefined,
                condition: undefined,
                value: "",
                operator: "AND",
              },
            ]);
          }
        }
      } catch (error) {
        console.error("Failed to parse filter state from URL:", error);
        const defaultCondition: FilterCondition = {
          id: Date.now(),
          field: undefined,
          condition: undefined,
          value: "",
          operator: "AND",
        };
        setSearchText("");
        setTags([]);
        setFilterConditions([defaultCondition]);
        setSearchParams({});
        setFilterOutput(null);
        setTagsOutput(null);
      }
    } else {
      if (
        filterConditions.length === 0 ||
        (filterConditions.length === 1 &&
          filterConditions[0].field === undefined &&
          filterConditions[0].condition === undefined &&
          filterConditions[0].value === "")
      ) {
        setFilterConditions([
          {
            id: Date.now(),
            field: undefined,
            condition: undefined,
            value: "",
            operator: "AND",
          },
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateAndDisplayOutput]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleTagSelectChange = (selectedTexts: string[]) => {
    const existingTagsMap = new Map(tags.map((tag) => [tag.text, tag]));

    const newTagsList: TagItem[] = [];
    selectedTexts.forEach((text) => {
      const existingTag = existingTagsMap.get(text);
      if (existingTag) {
        newTagsList.push(existingTag);
      } else {
        newTagsList.push({
          id: Date.now() + Math.random(),
          text,
          isLocked: false,
        });
      }
    });

    setTags(newTagsList);
  };

  const handleRemoveTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleToggleLockTag = (id: number) => {
    setTags(
      tags.map((tag) =>
        tag.id === id ? { ...tag, isLocked: !tag.isLocked } : tag
      )
    );
  };

  const handleAddFilterCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now(),
      field: undefined,
      condition: undefined,
      value: "",
      operator: "AND",
    };
    setFilterConditions([...filterConditions, newCondition]);
  };

  const handleUpdateFilterCondition = (
    id: number,
    field: keyof FilterCondition,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    setFilterConditions(
      filterConditions.map((condition) =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    );
  };

  const handleRemoveFilterCondition = (id: number) => {
    const remainingConditions = filterConditions.filter(
      (condition) => condition.id !== id
    );

    if (remainingConditions.length === 0) {
      const defaultCondition: FilterCondition = {
        id: Date.now(),
        field: undefined,
        condition: undefined,
        value: "",
        operator: "AND",
      };
      setFilterConditions([defaultCondition]);
      setSearchParams({});
      setFilterOutput(null);
      setTagsOutput(null);
    } else {
      setFilterConditions(remainingConditions);
    }
  };

  const handleFilterClick = () => {
    const currentFilterState: FilterState = {
      searchText: searchText,
      tags: tags,
      filterConditions: filterConditions.map((cond) => ({
        id: cond.id,
        field: cond.field || "",
        condition: cond.condition || "",
        value: cond.value,
        operator: cond.operator,
      })),
    };

    try {
      const filterStateJson = JSON.stringify(currentFilterState);
      const encodedFilterState = encodeURIComponent(filterStateJson);
      setSearchParams({ filter: encodedFilterState });
      generateAndDisplayOutput(searchText, tags, filterConditions);
    } catch (error) {
      console.error("Failed to save filter state to URL:", error);
      setSearchParams({});
      setFilterOutput(null);
      setTagsOutput(null);
    }
  };

  const handleClearClick = () => {
    setSearchText("");
    setTags([]);
    const defaultCondition: FilterCondition = {
      id: Date.now(),
      field: undefined,
      condition: undefined,
      value: "",
      operator: "AND",
    };
    setFilterConditions([defaultCondition]);

    setFilterOutput(null);
    setTagsOutput(null);
    setSearchParams({});
  };

  const columns: ColumnsType<OutputData> = [
    {
      title: "Filter",
      dataIndex: "filter",
      key: "filter",
      render: (text: string) => (
        <pre className="whitespace-pre-wrap break-words">{text}</pre>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
    },
  ];

  const data: OutputData[] =
    filterOutput !== null && tagsOutput !== null
      ? [
          {
            key: "1",
            filter: filterOutput,
            tags: tagsOutput,
          },
        ]
      : [];

  return (
    <div className="p-[20px] bg-white h-full border-t-[#ccc] border-t-[1px] border-l-[1px] border-l-[#ccc]">
      <p className="mb-6 font-bold">Thực hành extend form</p>
      <h2 className="mb-8 text-2xl">Filter</h2>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <div className="flex justify-between items-start">
          <div className="w-[50%]">
            <label htmlFor="search">Search</label>
            <Input
              className="!py-[9px] !px-[16px] !rounded-none !mt-[10px] !border-[#000]"
              id="search"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
          </div>

          <div className="w-[40%]">
            <label htmlFor="tags">Tag</label>
            <Select
              className="!mt-[10px]"
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags"
              value={tags.map((tag) => tag.text)}
              onChange={handleTagSelectChange}
              tokenSeparators={[","]}
              options={predefinedTagOptions}
            />
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    padding: "2px 8px",
                  }}
                >
                  <MinusCircleFilled
                    style={{
                      color: "#f5222d",
                      fontSize: "20px",
                      cursor: "pointer",
                      position: "relative",
                      marginRight: "4px",
                      top: "-5px",
                    }}
                    onClick={() => handleRemoveTag(tag.id)}
                  />
                  <p className="text-[14px]">{tag.text}</p>
                  {tag.isLocked ? (
                    <LockOutlined
                      onClick={() => handleToggleLockTag(tag.id)}
                      style={{ cursor: "pointer", marginLeft: "4px" }}
                    />
                  ) : (
                    <UnlockOutlined
                      onClick={() => handleToggleLockTag(tag.id)}
                      style={{ cursor: "pointer", marginLeft: "4px" }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4>Show Only Records With</h4>
          <Space direction="vertical" style={{ display: "flex" }}>
            {filterConditions.map((condition, index) => (
              <div key={condition.id}>
                {index > 0 && (
                  <Radio.Group
                    onChange={(e: RadioChangeEvent) =>
                      handleUpdateFilterCondition(
                        condition.id,
                        "operator",
                        e.target.value
                      )
                    }
                    value={condition.operator}
                    className="w-full"
                  >
                    <Radio value="AND">And</Radio>
                    <Radio value="OR">Or</Radio>
                  </Radio.Group>
                )}

                <Space
                  className="mt-[12px] w-full"
                  align="center"
                  wrap
                  size="small"
                >
                  {" "}
                  <Select
                    showSearch
                    value={condition.field}
                    onChange={(value: string) =>
                      handleUpdateFilterCondition(condition.id, "field", value)
                    }
                    options={fieldOptions}
                    style={{ width: 300 }}
                    placeholder="Columns"
                  />
                  <span>That</span>
                  <Select
                    showSearch
                    value={condition.condition}
                    onChange={(value: string) =>
                      handleUpdateFilterCondition(
                        condition.id,
                        "condition",
                        value
                      )
                    }
                    options={conditionOptions}
                    style={{ width: 300 }}
                    placeholder="Is"
                  />
                  <Input
                    value={condition.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateFilterCondition(
                        condition.id,
                        "value",
                        e.target.value
                      )
                    }
                    className="!py-[9px] !px-[16px] !rounded-none !mt-[10px] !border-[#000] !ml-[40px]"
                    placeholder="Text"
                    style={{ flexGrow: 1, minWidth: "350px" }}
                  />
                  {filterConditions.length > 1 && (
                    <Button
                      type="text"
                      className="ml-[40px]"
                      danger
                      onClick={() => handleRemoveFilterCondition(condition.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  )}
                </Space>
              </div>
            ))}
          </Space>
          <Button
            className="!border-none opacity-[0.6] font-medium"
            onClick={handleAddFilterCondition}
            style={{ marginTop: "10px" }}
          >
            + More Filter
          </Button>
        </div>

        <Space>
          <Button
            type="text"
            className="!px-[36px] !py-[12px] border !bg-[#86efac] !rounded-[6px] !h-[50px] !text-white"
            onClick={handleFilterClick}
          >
            Filter
          </Button>
          <Button type="text" onClick={handleClearClick}>
            Clear
          </Button>
        </Space>

        {filterOutput !== null && (
          <Table columns={columns} dataSource={data} pagination={false} />
        )}
      </Space>
    </div>
  );
};

export default Lesson6;
