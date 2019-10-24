package cards.database;

import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * Automatically sets config options from System variables. These variables can then be changed
 * for all future DatabaseConfigs.
 */
public class DatabaseConfig {
    private static DatabaseConfig instance;
    private static List<ServerAddress> hosts = new ArrayList<>();
    private static String username;
    private static char[] password;

    private DatabaseConfig() {
        String host = System.getProperty("mongo.host", "localhost");
        int port = Integer.parseInt(System.getProperty("mongo.port", "27017"));
        hosts.add(new ServerAddress(host, port));
        username = System.getProperty("mongo.username", "");
        password = System.getProperty("mongo.password", "").toCharArray();
    }

    public static DatabaseConfig getInstance() {
        if (instance == null) {
            instance = new DatabaseConfig();
        }
        return instance;
    }

    public String getUsername() {
        return username;
    }

    public DatabaseConfig setUsername(String username) {
        this.username = username;
        return this;
    }

    public char[] getPassword() {
        return password;
    }

    public DatabaseConfig setPassword(char[] password) {
        this.password = password;
        return this;
    }

    public DatabaseConfig setPassword(String password) {
        this.password = password.toCharArray();
        return this;
    }

    public MongoCredential getCredential() {
        return MongoCredential.createScramSha1Credential(
                getUsername(),
                "admin",
                getPassword()
        );
    }

    public DatabaseConfig setHosts(List<ServerAddress> hosts) {
        this.hosts = hosts;
        return this;
    }

    public List<ServerAddress> getHosts() {
        return hosts;
    }

    public DatabaseConfig setHost(String host, int port) {
        hosts.clear();
        hosts.add(new ServerAddress(host, port));
        return this;
    }
}
