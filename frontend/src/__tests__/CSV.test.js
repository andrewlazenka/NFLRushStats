import { cleanup } from "@testing-library/react";
import CSV from "../modules/CSV";

afterEach(cleanup);

it("does not generate csv when data is empty", () => {
  const playerCSV = new CSV(null, 'Test file name')
  expect(playerCSV.data).toEqual([]);

  playerCSV.generate()
  expect(playerCSV.csv).toEqual('');
});

it("sets default file name when not given", () => {
  const playerCSV = new CSV(null)
  expect(playerCSV.fileName).toEqual('Download');
});

it("does not download csv when data is empty", () => {
  const playerCSV = new CSV(null, 'Test file name')
  playerCSV.generate()
  playerCSV.download()
  expect(playerCSV.link).toEqual(null)
});

it("sets data in class", () => {

const csvData = [
  {
    name: 'test1'
  },
]
  const playerCSV = new CSV(csvData, 'Test file name')
  expect(playerCSV.data).toEqual(csvData);
});

it("sets file name in class", () => {
  const fileName = 'Test file name'
  const playerCSV = new CSV(null, fileName)
  expect(playerCSV.fileName).toEqual(fileName);
});

it("generates csv data", () => {
  const csvData = [
    {
      name: 'test1'
    },
  ]
  const fileName = 'Test file name'
  const playerCSV = new CSV(csvData, fileName)
  playerCSV.generate()
  expect(playerCSV.csv.length).toBeGreaterThan(0);
});

it("downloads csv when data is provided", () => {
  const csvData = [
    {
      name: 'test1'
    },
  ]
  const playerCSV = new CSV(csvData, 'Test file name')
  playerCSV.generate()
  playerCSV.download()
  expect(playerCSV.link).not.toBe(null)
});

it("strips commas from strings that are numbers", () => {
  const csvData = [
    {
      id: '1,000'
    },
  ]
  const playerCSV = new CSV(csvData, 'Test file name')
  playerCSV.generate()
  expect(playerCSV.csv).toEqual(expect.stringContaining("1000"))
});

it("adds comma delimeter for row data", () => {
  const csvData = [
    {
      id: 1,
      name: 'test1'
    },
    {
      id: 2,
      name: 'test2'
    },
  ]
  const playerCSV = new CSV(csvData, 'Test file name')
  playerCSV.generate()
  expect(playerCSV.csv).toEqual(expect.stringContaining("id,name"))
  expect(playerCSV.csv).toEqual(expect.stringContaining("1,test1"))
  expect(playerCSV.csv).toEqual(expect.stringContaining("2,test2"))
});

