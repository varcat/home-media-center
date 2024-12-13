<script setup>
const data = [
  {
    id: 7,
    links: [
      "https://testfile.tumour.cc/docs/2024/12/13/4fb896156df0a23a510c482973f10c3e_20240915_刘伟_511108199009248563_微精检测 (1).pdf?Expires=1734159202&OSSAccessKeyId=LTAI5tM7c6KnbzTLp6Cjb9Sz&Signature=N3qL%2BfZJg0KE2KY5EAVcvRaedps%3D",
      "https://testfile.tumour.cc/images/2024/12/13/5aec4237dee51d025836ae1f3f6bd74a_OIP-C.jpg?Expires=1734159202&OSSAccessKeyId=LTAI5tM7c6KnbzTLp6Cjb9Sz&Signature=c%2F7DPKp%2BmBjeeeD3z%2BL78HXRoXg%3D",
    ],
    status: 0,
    createTime: "2024-12-13 14:53",
  },
];

function processShitData(xs) {
  if (!Array.isArray(xs)) {
    throw new Error("入参需要是Array");
  }

  const last = (arr) => {
    return arr[arr.length - 1];
  };
  const isImg = (fileName) => {
    return [".png", ".jpg", ".jpeg"].some((ext) => fileName.endsWith(ext));
  };
  const isFile = (fileName) => {
    return [
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".txt",
      ".zip",
      ".rar",
    ].some((ext) => fileName.endsWith(ext));
  };

  return xs.map((item) => {
    const x = {
      ...item,
      fileList: [],
      imgList: [],
    };
    if (Array.isArray(item.links)) {
      item.links.forEach((url) => {
        const [href, qs] = url.split("?");
        const rawFileName = last(href.split("/"));
        const fileName = rawFileName.replace(/\w{32}_(\d{8}_)?/, "");
        if (isImg(fileName)) {
          x.imgList.push({
            name: fileName,
            url,
          });
        } else if (isFile(fileName)) {
          x.fileList.push({
            name: fileName,
            url,
          });
        }
      });
    }
    return x;
  });
}
console.log(processShitData(data));
</script>

<template></template>

<style scoped lang="less"></style>
