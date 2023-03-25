import { OpenAIModel, OpenAIModelID, OpenAIModels } from "@/types";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { key, baseUrl } = (await req.json()) as {
      key: string;
      baseUrl: string
    };
    // console.log('33333333333333', key, baseUrl)

    const response = await fetch(`${baseUrl || 'https://api.openai.com' }/v1/models`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key ? key : process.env.OPENAI_API_KEY}`
      }
    });

    if (response.status !== 200) {
      throw new Error("OpenAI API returned an error");
    }

    const json = await response.json();

    const models: OpenAIModel[] = json.data
      .map((model: any) => {
        for (const [key, value] of Object.entries(OpenAIModelID)) {
          if (value === model.id) {
            return {
              id: model.id,
              name: OpenAIModels[value].name
            };
          }
        }
      })
      .filter(Boolean);

    return new Response(JSON.stringify(models), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
