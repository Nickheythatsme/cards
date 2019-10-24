package cards.database;

import com.mongodb.*;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;

import java.util.concurrent.locks.ReentrantLock;
import java.util.logging.Logger;

public class Connection {
    private static Logger LOG = Logger.getLogger(Connection.class.getName());
    private static Connection instance;
    private static ReentrantLock instanceLock = new ReentrantLock();
    private MongoClient mongoClient;

    private static MongoClient makeMongoClient() {
        LOG.info("Making new MongoClient");
        DatabaseConfig config = DatabaseConfig.getInstance();
        String u = config.getUsername();
        return MongoClients.create(
                MongoClientSettings.builder()
                        .applyToClusterSettings(builder ->
                                builder.hosts(config.getHosts()))
                        .credential(config.getCredential())
                        .build()
        );
    }

    private Connection() {
        mongoClient = makeMongoClient();
    }

    public static Connection getInstance() {
        instanceLock.lock();
        if (instance == null) {
            instance = new Connection();
        }
        instanceLock.unlock();
        return instance;
    }

    public static Connection remakeConnection() {
        instanceLock.lock();
        instance = new Connection();
        instanceLock.unlock();
        return instance;
    }

    public boolean isValid() {
        try {
            return mongoClient.listDatabaseNames().first() != null;
        } catch(MongoSecurityException e) {
            LOG.warning("Database credentials are invalid:\n" + e.toString());
            return false;
        } catch(MongoTimeoutException e) {
            LOG.warning("Database host is unreachable:\n" + e.toString());
            return false;
        }
    }

    public MongoDatabase getDatabase(String name) {
        return mongoClient.getDatabase(name);
    }
}
