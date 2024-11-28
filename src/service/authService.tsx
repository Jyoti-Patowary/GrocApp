export const customerLogin = async (phone: string) => {
    try {
        // Validate the phone number format
        const phoneRegex = /^[0-9]{10}$/; // Regex for a 10-digit phone number
        if (!phoneRegex.test(phone)) {
            return {
                status: 400,
                message: "Invalid phone number format. Please enter a 10-digit phone number.",
            };
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data for successful login
        const mockResponse = {
            status: 200,
            message: "Login successful",
            data: {
                userId: "12345",
                name: "John Doe",
                phone,
                email: "johndoe@example.com",
                accessToken: "abcdef123456",
                refreshToken: "ghijkl789101",
                liveLocation: {
                    latitude: 37.7749,
                    longitude: -122.4194,
                },
                address: "123 Main Street, Springfield, USA",
                role: "customer", // Possible values: 'customer', 'delivery', 'admin'
                profileImage: "https://example.com/profile-image.jpg",
                preferences: {
                    notificationsEnabled: true,
                    darkMode: false,
                },
            },
        };

        // Simulate a valid phone number check
        if (phone === "1234567890") {
            return mockResponse;
        }

        // Mock error response for invalid phone number
        const errorResponse = {
            status: 401,
            message: "Phone number not found.",
        };

        return errorResponse;
    } catch (error) {
        console.log("Login error", error);
        return {
            status: 500,
            message: "Internal server error",
        };
    }
};
