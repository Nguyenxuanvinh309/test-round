import service from "../service";

export async function currencyRequest() {
  try {
    const res = service.getCurrencyList();
    const data = (await res);
    const parseData = {
      data: data || null,
      code: 200,
    };
    return parseData;
  } catch (error) {
    return error;
  }
}

export async function currencyQueryRequest({
  params
}: {
  params: string
}) {
  try {
    const res = service.getCurrencyQuery(params);
    const data = (await res);
    const parseData = {
      data: data || null,
      code: 200,
    };
    return parseData;
  } catch (error) {
    return error;
  }
}