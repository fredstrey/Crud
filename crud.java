import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;

public class CRUDJava {

    private static Connection connection;

    public static void main(String[] args) {
        connect();
        showMenu();
        disconnect();
    }

    private static void connect() {
        String url = "jdbc:mysql://localhost:3306/your_database";
        String user = "your_username";
        String password = "your_password";

        try {
            connection = DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void disconnect() {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private static void showMenu() {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("\nCRUD - Java/MySQL");
            System.out.println("Select an option:");
            System.out.println("1 - List products");
            System.out.println("2 - Insert products");
            System.out.println("3 - Update products");
            System.out.println("4 - Delete products");
            System.out.println("5 - Exit");
            System.out.print("-> ");
            
            String option = scanner.nextLine().toLowerCase();
            switch (option) {
                case "1":
                    listProducts();
                    break;
                case "2":
                    insertProduct();
                    break;
                case "3":
                    updateProduct();
                    break;
                case "4":
                    deleteProduct();
                    break;
                case "5":
                    System.out.println("Exiting the program...");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid option, try again...");
            }
        }
    }

    private static void listProducts() {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM products");
            ResultSet resultSet = statement.executeQuery();
            
            // Code to display the products retrieved from the database

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void insertProduct() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("\nInserting a new product...");

        // Code to gather information from the user
        
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)");
            // Set values for the prepared statement
            
            int rowsAffected = statement.executeUpdate();
            if (rowsAffected == 1) {
                System.out.println("Product inserted successfully!");
            } else {
                System.out.println("Failed to insert product.");
            }
            
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void updateProduct() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("\nUpdating a product...");

        // Code to gather information from the user
        
        try {
            PreparedStatement statement = connection.prepareStatement("UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?");
            // Set values for the prepared statement
            
            int rowsAffected = statement.executeUpdate();
            if (rowsAffected == 1) {
                System.out.println("Product updated successfully!");
            } else {
                System.out.println("Failed to update product.");
            }
            
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void deleteProduct() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("\nDeleting a product...");

        // Code to gather information from the user
        
        try {
            PreparedStatement statement = connection.prepareStatement("DELETE FROM products WHERE id = ?");
            // Set values for the prepared statement
            
            int rowsAffected = statement.executeUpdate();
            if (rowsAffected == 1) {
                System.out.println("Product deleted successfully!");
            } else {
                System.out.println("Failed to delete product.");
            }
            
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
