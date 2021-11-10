import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.EntityTransaction;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class DataBeans implements Serializable {
    private static final long serialVersionUID = 1L;
    private List<Data> array;
    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;
    private EntityTransaction trans;
    private Data newData;

    public DataBeans() throws IOException {
        connectToDB();
        firstLoad();
        newData = new Data();;
    }

    private void connectToDB() {
        entityManagerFactory = Persistence.createEntityManagerFactory("Data");
        entityManager = entityManagerFactory.createEntityManager();
        trans = entityManager.getTransaction();
    }

    private void firstLoad() throws IOException {
        array = new ArrayList<>();
        try {
            trans.begin();
            array = (List<Data>) entityManager.createQuery("SELECT d FROM Data d").getResultList();
            trans.commit();
        } catch (RuntimeException exception) {
            if (trans.isActive()) {
                trans.rollback();
            }
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            context.redirect(context.getRequestContextPath() + "/error.jsf");
        }
    }

    public void addData() throws IOException {
        try {
            trans.begin();
            newData.checkAll();
            entityManager.persist(newData);
            array.add(newData);
            newData = new Data();
            trans.commit();
        } catch (RuntimeException exception) {
            if (trans.isActive()) {
                trans.rollback();
            }
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            context.redirect(context.getRequestContextPath() + "/error.jsf");
        }
    }

    public void clear() throws IOException {
        try {
            trans.begin();
            entityManager.createQuery("DELETE FROM Data").executeUpdate();
            array.clear();
            trans.commit();
        } catch (RuntimeException exception) {
            if (trans.isActive()) {
                trans.rollback();
            }
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            context.redirect(context.getRequestContextPath() + "/error.jsf");
        }
    }

    public List<Data> getArray() {
        return array;
    }

    public Data getNewData() {
        return newData;
    }

    public void setArray(List<Data> array) {
        this.array = array;
    }

    public void setNewData(Data newData) {
        this.newData = newData;
    }
}
