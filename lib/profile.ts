import { User } from "@/types";

export async function getUserProfile(
  accessToken: string,
): Promise<Omit<User, "role">> {
  try {
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/me?$select=employeeId",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await response.json();

    // Extract relevant information from the response
    const { employeeId } = data;
    return { nuid: employeeId };
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
}
