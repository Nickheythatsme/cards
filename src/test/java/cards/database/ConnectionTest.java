package cards.database;

import org.junit.*;

public class ConnectionTest {
    private Connection connection = Connection.getInstance();

    @Before
    public void init() {
        DatabaseConfig.getInstance()
                .setUsername("root")
                .setPassword("example")
                .setHost("localhost", 27017);
        Connection.remakeConnection();
    }

    @Test
    public void createMongoClient() {
        Assert.assertTrue(connection.isValid());
    }

    @Test
    public void createMongoClientNegative() {
        DatabaseConfig.getInstance().setUsername("invalid");
        Connection.remakeConnection();
        Assert.assertFalse(connection.isValid());
    }
}
