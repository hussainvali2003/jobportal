//
//package com.jobportal.demo.service;
//
//import java.util.HashMap;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import com.jobportal.demo.entity.Job;
//import com.jobportal.demo.repository.JobRepository;
//
//@Service
//public class JobFilterService {
//
//    @Autowired
//    private JobRepository jobRepository;
//
//    @Autowired
//    private NLPService nlpService;
//
//    private static final double TITLE_SIMILARITY_THRESHOLD = 0.8;
//    private static final double DESCRIPTION_SIMILARITY_THRESHOLD = 0.7;
//    private static final double RELATED_JOB_THRESHOLD = 0.5;
//    private static final double CATEGORY_MATCH_BONUS = 2.0;
//    private static final double IT_STRICT_THRESHOLD = 0.3; // Lower threshold for better IT job matching
//
//    // Comprehensive IT Technology Categories
//    private static final Map<String, Set<String>> TECH_CATEGORIES = new HashMap<>();
//    private static final Map<String, Set<String>> NON_TECH_CATEGORIES = new HashMap<>();
//
//    static {
//        // Frontend Technologies
//        TECH_CATEGORIES.put("frontend", Set.of(
//            "html", "css", "javascript", "js", "typescript", "ts", "react", "reactjs", "react.js", 
//            "angular", "angularjs", "vue", "vuejs", "svelte", "jquery", "bootstrap", "tailwind", 
//            "tailwindcss", "sass", "scss", "less", "nextjs", "next", "nuxtjs", "nuxt", "gatsby", 
//            "webpack", "vite", "parcel", "redux", "graphql", "materialui", "mui", "frontend", 
//            "front-end", "ui", "ux", "user interface", "responsive design", "dom", "css3", "html5"
//        ));
//
//        // Backend Technologies
//        TECH_CATEGORIES.put("backend", Set.of(
//            "java", "python", "node", "nodejs", "node.js", "express", "expressjs", "django", "flask", 
//            "spring", "springboot", "spring boot", "laravel", "rails", "ruby on rails", "asp.net", 
//            "aspnet", "dotnet", ".net", "php", "c#", "csharp", "go", "golang", "rust", "kotlin", 
//            "scala", "nestjs", "micronaut", "quarkus", "hibernate", "jpa", "backend", "back-end", 
//            "server", "api", "rest", "restful", "microservices", "web services", "servlet", "jsp",
//            "fastapi", "gin", "fiber", "actix", "symfony", "codeigniter", "ruby", "perl"
//        ));
//
//        // Fullstack
//        TECH_CATEGORIES.put("fullstack", Set.of(
//            "fullstack", "full stack", "full-stack", "mern", "mean", "mevn", "lamp", "jamstack", "pern"
//        ));
//
//        // DevOps & Cloud
//        TECH_CATEGORIES.put("devops", Set.of(
//            "aws", "amazon web services", "azure", "microsoft azure", "gcp", "google cloud", 
//            "google cloud platform", "docker", "kubernetes", "k8s", "terraform", "ansible", 
//            "jenkins", "gitlab", "github actions", "prometheus", "grafana", "istio", "helm", 
//            "argo", "spinnaker", "ci/cd", "cicd", "devops", "deployment", "infrastructure", 
//            "monitoring", "automation", "nginx", "apache", "linux", "unix", "shell", "bash",
//            "chef", "puppet", "vagrant", "consul", "vault", "nomad"
//        ));
//
//        // Mobile Development
//        TECH_CATEGORIES.put("mobile", Set.of(
//            "android", "ios", "flutter", "react native", "rn", "kotlin", "swift", "xamarin", 
//            "ionic", "cordova", "phonegap", "mobile", "mobile dev", "mobile development", 
//            "app development", "mobile app", "android studio", "xcode", "objective-c"
//        ));
//
//        // Database Technologies
//        TECH_CATEGORIES.put("database", Set.of(
//            "sql", "mysql", "postgresql", "postgres", "oracle", "mongodb", "mongo", "redis", 
//            "elasticsearch", "es", "dynamodb", "firebase", "cassandra", "neo4j", "sqlite", 
//            "mariadb", "couchdb", "database", "db", "dbms", "data", "nosql", "rdbms",
//            "bigquery", "snowflake", "redshift", "clickhouse", "influxdb"
//        ));
//
//        // Programming Languages
//        TECH_CATEGORIES.put("programming", Set.of(
//            "java", "python", "javascript", "typescript", "c++", "cpp", "c", "c#", "csharp",
//            "php", "ruby", "go", "golang", "rust", "kotlin", "swift", "scala", "r", "matlab",
//            "perl", "lua", "dart", "elixir", "clojure", "haskell", "erlang", "f#", "vb.net"
//        ));
//
//        // Testing & QA
//        TECH_CATEGORIES.put("testing", Set.of(
//            "selenium", "junit", "testng", "mockito", "jest", "cypress", "playwright", "puppeteer",
//            "postman", "insomnia", "jmeter", "loadrunner", "cucumber", "mocha", "chai", "jasmine",
//            "testing", "qa", "quality assurance", "automation testing", "manual testing", "tdd",
//            "bdd", "unit testing", "integration testing", "e2e testing", "performance testing"
//        ));
//
//        // Data Science & AI
//        TECH_CATEGORIES.put("datascience", Set.of(
//            "python", "r", "pandas", "numpy", "scipy", "sklearn", "tensorflow", "pytorch", "keras",
//            "opencv", "matplotlib", "seaborn", "jupyter", "anaconda", "spark", "hadoop", "kafka",
//            "airflow", "mlflow", "kubeflow", "data science", "machine learning", "deep learning",
//            "artificial intelligence", "ai", "ml", "dl", "nlp", "computer vision", "statistics"
//        ));
//
//        // Additional IT Categories
//        TECH_CATEGORIES.put("frameworks", Set.of(
//            "spring", "django", "flask", "express", "react", "angular", "vue", "laravel",
//            "rails", "hibernate", "struts", "tapestry", "wicket", "jsf", "primefaces"
//        ));
//
//        TECH_CATEGORIES.put("tools", Set.of(
//            "git", "svn", "maven", "gradle", "npm", "yarn", "webpack", "gulp", "grunt",
//            "intellij", "eclipse", "vscode", "netbeans", "postman", "swagger", "jira",
//            "confluence", "slack", "teams"
//        ));
//
//        // Non-IT Categories (to exclude when searching for tech terms)
//        NON_TECH_CATEGORIES.put("sales", Set.of(
//            "sales", "marketing", "digital marketing", "seo", "social media", "content marketing",
//            "email marketing", "ppc", "google ads", "facebook ads", "business development",
//            "account executive", "sales executive", "marketing executive", "lead generation",
//            "crm", "salesforce", "hubspot"
//        ));
//
//        NON_TECH_CATEGORIES.put("customer_service", Set.of(
//            "customer support", "customer service", "call center", "bpo", "telecalling", 
//            "helpdesk", "technical support", "client service", "customer care", "support",
//            "chat support", "phone support", "email support"
//        ));
//
//        NON_TECH_CATEGORIES.put("hr", Set.of(
//            "hr", "human resources", "recruitment", "talent acquisition", "hr executive", 
//            "recruiter", "hr manager", "staffing", "interviewing", "onboarding", "payroll",
//            "employee relations", "performance management", "training", "learning development"
//        ));
//
//        NON_TECH_CATEGORIES.put("accounting", Set.of(
//            "accounting", "finance", "accounts", "ca", "cpa", "bookkeeping", "taxation", 
//            "audit", "financial analysis", "accounts payable", "accounts receivable", "tally",
//            "quickbooks", "excel", "financial planning", "budgeting", "cost accounting"
//        ));
//
//        NON_TECH_CATEGORIES.put("operations", Set.of(
//            "operations", "logistics", "supply chain", "warehouse", "inventory", "procurement",
//            "vendor management", "facility management", "admin", "administrative", "office management",
//            "receptionist", "data entry", "filing", "documentation"
//        ));
//    }
//
//    // Enhanced technology synonyms
//    private static final Map<String, String> TECH_SYNONYMS = Map.ofEntries(
//        // Frontend
//        Map.entry("rea", "react"), Map.entry("reactjs", "react"), Map.entry("react.js", "react"),
//        Map.entry("rct", "react"), Map.entry("js", "javascript"), Map.entry("es6", "javascript"),
//        Map.entry("ts", "typescript"), Map.entry("ng", "angular"), Map.entry("angularjs", "angular"),
//        Map.entry("vjs", "vue"), Map.entry("vuejs", "vue"), Map.entry("sveltejs", "svelte"),
//        Map.entry("jq", "jquery"), Map.entry("bs", "bootstrap"), Map.entry("tw", "tailwind"),
//        Map.entry("scss", "sass"), Map.entry("nextjs", "next"), Map.entry("nuxtjs", "nuxt"),
//        
//        // Backend  
//        Map.entry("nodejs", "node"), Map.entry("node.js", "node"), Map.entry("expressjs", "express"),
//        Map.entry("springboot", "spring"), Map.entry("sboot", "spring"), Map.entry("dj", "django"),
//        Map.entry("fl", "flask"), Map.entry("aspnet", "asp.net"), Map.entry("dotnet", ".net"),
//        Map.entry("csharp", "c#"), Map.entry("goln", "go"), Map.entry("golang", "go"),
//        
//        // Databases
//        Map.entry("postgresql", "postgres"), Map.entry("psql", "postgres"), Map.entry("pg", "postgres"),
//        Map.entry("mongo", "mongodb"), Map.entry("mdb", "mongodb"), Map.entry("es", "elasticsearch"),
//        Map.entry("dynamo", "dynamodb"), Map.entry("sqlite", "sql"), Map.entry("msql", "mysql"),
//        
//        // DevOps
//        Map.entry("k8s", "kubernetes"), Map.entry("kube", "kubernetes"), Map.entry("tf", "terraform"),
//        Map.entry("ans", "ansible"), Map.entry("jenk", "jenkins"), Map.entry("cicd", "ci/cd"),
//        
//        // Mobile
//        Map.entry("rn", "react native"), Map.entry("reactnative", "react native"),
//        Map.entry("flut", "flutter"), Map.entry("swft", "swift"),
//        
//        // Cloud
//        Map.entry("aws", "amazon web services"), Map.entry("gcp", "google cloud"),
//        Map.entry("gcloud", "google cloud")
//    );
//
//    // Main filtering method with enhanced IT-only logic
//    public Page<Job> filterJobsWithNLP(String searchTerm, String experience, String locationFilter, 
//                                     String status, String fieldFilter, String jobIdFilter, Pageable pageable) {
//        
//        // Determine if this should be an IT-only search
//        boolean isITFieldRequest = isITFieldRequest(fieldFilter);
//        boolean isITTechnologySearch = isITTechnologySearch(searchTerm);
//        boolean strictITMode = isITFieldRequest || isITTechnologySearch;
//        
//        System.out.println("=== JOB FILTER DEBUG ===");
//        System.out.println("Search Term: " + searchTerm);
//        System.out.println("Field Filter: " + fieldFilter);
//        System.out.println("Is IT Field Request: " + isITFieldRequest);
//        System.out.println("Is IT Technology Search: " + isITTechnologySearch);
//        System.out.println("Strict IT Mode: " + strictITMode);
//        
//        // Get all jobs that match basic filters (excluding field filter initially)
//        List<Job> baseFilteredJobs = jobRepository.findAll().stream()
//                .filter(job -> applyBasicFilters(job, experience, locationFilter, status, null, jobIdFilter))
//                .collect(Collectors.toList());
//
//        System.out.println("Base filtered jobs count (without field filter): " + baseFilteredJobs.size());
//
//        List<Job> finalFilteredJobs;
//
//        if (searchTerm == null || searchTerm.trim().isEmpty()) {
//            // No search term - apply field filter only
//            if (isITFieldRequest || (fieldFilter != null && !fieldFilter.isEmpty())) {
//                finalFilteredJobs = baseFilteredJobs.stream()
//                        .filter(job -> matchesFieldFilter(job, fieldFilter))
//                        .collect(Collectors.toList());
//            } else {
//                finalFilteredJobs = baseFilteredJobs;
//            }
//        } else {
//            String cleanSearchTerm = normalizeSearchTerm(searchTerm);
//            Set<String> relatedTerms = findRelatedTerms(cleanSearchTerm);
//            
//            System.out.println("Related terms found: " + relatedTerms);
//            
//            // Score all jobs
//            Map<Job, Double> scoredJobs = new HashMap<>();
//            double threshold = strictITMode ? IT_STRICT_THRESHOLD : RELATED_JOB_THRESHOLD;
//            
//            for (Job job : baseFilteredJobs) {
//                boolean jobPassesFilters = true;
//                
//                // Apply field filter if provided
//                if (fieldFilter != null && !fieldFilter.isEmpty()) {
//                    jobPassesFilters = matchesFieldFilter(job, fieldFilter);
//                }
//                
//                // In strict IT mode, only consider IT jobs
//                if (strictITMode && jobPassesFilters) {
//                    if (!isITJob(job)) {
//                        System.out.println("Filtering out non-IT job: " + job.getTitle() + " at " + job.getCompany());
//                        continue;
//                    }
//                }
//                
//                if (!jobPassesFilters) {
//                    continue;
//                }
//                
//                double score = calculateRelevanceScore(job, cleanSearchTerm, relatedTerms);
//                if (score >= threshold) {
//                    scoredJobs.put(job, score);
//                    System.out.println("Job matched with score " + score + ": " + job.getTitle() + " at " + job.getCompany());
//                }
//            }
//
//            // Sort by score descending
//            finalFilteredJobs = scoredJobs.entrySet().stream()
//                    .sorted(Map.Entry.<Job, Double>comparingByValue().reversed())
//                    .map(Map.Entry::getKey)
//                    .collect(Collectors.toList());
//        }
//
//        System.out.println("Final filtered jobs count: " + finalFilteredJobs.size());
//        System.out.println("========================");
//
//        // Apply pagination
//        int start = (int) pageable.getOffset();
//        int end = Math.min(start + pageable.getPageSize(), finalFilteredJobs.size());
//        
//        List<Job> pageContent = finalFilteredJobs.subList(start, end);
//        
//        return new PageImpl<>(pageContent, pageable, finalFilteredJobs.size());
//    }
//
//    // Backward compatibility method
//    public List<Job> filterJobsWithNLP(String searchTerm, String experience, String locationFilter, 
//                                     String status, String fieldFilter, String jobIdFilter) {
//        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
//        return filterJobsWithNLP(searchTerm, experience, locationFilter, status, fieldFilter, jobIdFilter, pageable).getContent();
//    }
//
//    // Enhanced IT field detection
//    private boolean isITFieldRequest(String fieldFilter) {
//        if (fieldFilter == null || fieldFilter.trim().isEmpty()) {
//            return false;
//        }
//        
//        String field = fieldFilter.toLowerCase().trim();
//        return field.equals("it") || 
//               field.equals("information technology") || 
//               field.equals("technology") || 
//               field.equals("software") || 
//               field.equals("development") || 
//               field.equals("programming") ||
//               field.equals("engineering") ||
//               field.contains("tech") ||
//               field.contains("developer") ||
//               field.contains("software");
//    }
//
//    // Enhanced IT technology search detection - This is the key method
//    private boolean isITTechnologySearch(String searchTerm) {
//        if (searchTerm == null || searchTerm.trim().isEmpty()) {
//            return false;
//        }
//        
//        String normalizedTerm = normalizeSearchTerm(searchTerm);
//        String[] terms = normalizedTerm.split("\\s+");
//        
//        // Check each term in the search
//        for (String term : terms) {
//            if (isITTerm(term)) {
//                System.out.println("Found IT term: " + term);
//                return true;
//            }
//        }
//        
//        return false;
//    }
//    
//    // Helper method to check if a single term is IT-related
//    private boolean isITTerm(String term) {
//        // Direct category match
//        if (TECH_CATEGORIES.containsKey(term)) {
//            return true;
//        }
//        
//        // Check if term exists in any IT technology category
//        for (Map.Entry<String, Set<String>> entry : TECH_CATEGORIES.entrySet()) {
//            if (entry.getValue().contains(term)) {
//                return true;
//            }
//        }
//        
//        // Check synonyms
//        if (TECH_SYNONYMS.containsKey(term) || TECH_SYNONYMS.containsValue(term)) {
//            return true;
//        }
//        
//        // Partial matching for technology terms (minimum 3 characters)
//        if (term.length() >= 3) {
//            for (Set<String> techSet : TECH_CATEGORIES.values()) {
//                for (String tech : techSet) {
//                    // More precise partial matching
//                    if (tech.equals(term) || 
//                        (tech.length() >= 3 && tech.contains(term)) ||
//                        (term.length() >= 3 && term.contains(tech))) {
//                        return true;
//                    }
//                }
//            }
//            
//            // Check partial matches in synonyms
//            for (Map.Entry<String, String> entry : TECH_SYNONYMS.entrySet()) {
//                if (entry.getKey().equals(term) || entry.getValue().equals(term) ||
//                    (entry.getKey().length() >= 3 && entry.getKey().contains(term)) ||
//                    (entry.getValue().length() >= 3 && entry.getValue().contains(term))) {
//                    return true;
//                }
//            }
//        }
//        
//        return false;
//    }
//
//    // Enhanced IT job detection with better scoring
//    private boolean isITJob(Job job) {
//        String title = job.getTitle().toLowerCase();
//        String description = job.getDescription().toLowerCase();
//        String field = job.getField() != null ? job.getField().toLowerCase() : "";
//        String jobText = title + " " + description + " " + field;
//        
//        // Check field first - strongest indicator
//        if (isFieldITRelated(field)) {
//            return true;
//        }
//        
//        // Check title for IT keywords - second strongest
//        if (containsITKeywords(title, true)) {
//            return true;
//        }
//        
//        // Check for specific IT technologies in job content
//        int techScore = 0;
//        for (Set<String> techSet : TECH_CATEGORIES.values()) {
//            for (String tech : techSet) {
//                if (jobText.contains(" " + tech + " ") || 
//                    jobText.startsWith(tech + " ") || 
//                    jobText.endsWith(" " + tech) ||
//                    jobText.equals(tech)) {
//                    techScore++;
//                    if (techScore >= 2) return true; // Multiple tech mentions = IT job
//                }
//            }
//        }
//        
//        // Check tech synonyms
//        for (Map.Entry<String, String> entry : TECH_SYNONYMS.entrySet()) {
//            if (jobText.contains(entry.getKey()) || jobText.contains(entry.getValue())) {
//                techScore++;
//                if (techScore >= 2) return true;
//            }
//        }
//        
//        // Check description for IT context
//        if (containsITKeywords(description, false) && techScore > 0) {
//            return true;
//        }
//        
//        return techScore >= 3; // High tech score indicates IT job
//    }
//    
//    private boolean isFieldITRelated(String field) {
//        if (field == null || field.isEmpty()) return false;
//        
//        String[] itFields = {
//            "it", "information technology", "technology", "software", "development", 
//            "engineering", "tech", "programmer", "developer", "computer science",
//            "information systems", "software engineering", "computer engineering"
//        };
//        
//        for (String itField : itFields) {
//            if (field.contains(itField)) {
//                return true;
//            }
//        }
//        return false;
//    }
//    
//    private boolean containsITKeywords(String text, boolean isTitle) {
//        String[] strongItKeywords = {
//            "developer", "programmer", "software engineer", "tech lead", "technical lead",
//            "system engineer", "devops engineer", "data scientist", "ml engineer",
//            "frontend developer", "backend developer", "fullstack developer", "full stack developer",
//            "web developer", "mobile developer", "app developer", "software developer",
//            "java developer", "python developer", "react developer", "angular developer"
//        };
//        
//        String[] generalItKeywords = {
//            "software", "programming", "coding", "development", "technical", "engineer",
//            "architect", "analyst", "qa", "testing", "automation", "cloud", "database",
//            "network", "security", "ai", "machine learning", "data science"
//        };
//        
//        // For titles, use stronger keywords
//        String[] keywords = isTitle ? strongItKeywords : generalItKeywords;
//        
//        for (String keyword : keywords) {
//            if (text.contains(keyword)) {
//                return true;
//            }
//        }
//        return false;
//    }
//    
//    private boolean matchesFieldFilter(Job job, String fieldFilter) {
//        if (fieldFilter == null || fieldFilter.isEmpty()) {
//            return true;
//        }
//        
//        String jobField = job.getField() != null ? job.getField().toLowerCase() : "";
//        String filterField = fieldFilter.toLowerCase();
//        
//        return filterField.equals(jobField) || jobField.contains(filterField);
//    }
//
//    // Enhanced relevance scoring with better tech term matching
//    private double calculateRelevanceScore(Job job, String searchTerm, Set<String> relatedTerms) {
//        double score = 0.0;
//        String title = job.getTitle().toLowerCase();
//        String company = job.getCompany().toLowerCase();
//        String description = job.getDescription().toLowerCase();
//        String field = job.getField() != null ? job.getField().toLowerCase() : "";
//        String jobText = title + " " + description + " " + field;
//        
//        // 1. Exact matches (highest priority)
//        if (title.contains(searchTerm)) score += 5.0;
//        if (company.contains(searchTerm)) score += 3.0;
//        if (field.contains(searchTerm)) score += 4.0;
//        if (description.contains(searchTerm)) score += 2.0;
//        
//        // 2. Technology-specific scoring
//        if (isITTechnologySearch(searchTerm)) {
//            // Boost score for IT jobs when searching tech terms
//            if (isITJob(job)) {
//                score += 3.0;
//            }
//            
//            // Check for exact tech term matches
//            for (String relatedTerm : relatedTerms) {
//                if (title.contains(relatedTerm)) score += 2.5;
//                if (description.contains(relatedTerm)) score += 1.5;
//                if (field.contains(relatedTerm)) score += 2.0;
//            }
//        }
//        
//        // 3. Word boundary matches (more precise)
//        String[] terms = searchTerm.split("\\s+");
//        for (String term : terms) {
//            if (title.matches(".*\\b" + term + "\\b.*")) score += 2.0;
//            if (company.matches(".*\\b" + term + "\\b.*")) score += 1.5;
//            if (field.matches(".*\\b" + term + "\\b.*")) score += 1.8;
//            if (description.matches(".*\\b" + term + "\\b.*")) score += 1.0;
//        }
//        
//        // 4. Technology synonym matching
//        String normalizedTerm = TECH_SYNONYMS.getOrDefault(searchTerm, searchTerm);
//        if (!normalizedTerm.equals(searchTerm) && jobText.contains(normalizedTerm)) {
//            score += 2.0;
//        }
//        
//        // 5. Category-based matching
//        if (isCategorySearch(searchTerm)) {
//            score += calculateCategoryScore(jobText, searchTerm, relatedTerms);
//        }
//        
//        // 6. NLP similarity (if available)
//        try {
//            if (nlpService != null) {
//                score += nlpService.calculateSimilarity(searchTerm, title) * 2.0;
//                score += nlpService.calculateSimilarity(searchTerm, description) * 1.0;
//            }
//        } catch (Exception e) {
//            // Continue without NLP
//        }
//        
//        return score;
//    }
//
//    private boolean isCategorySearch(String searchTerm) {
//        return TECH_CATEGORIES.containsKey(searchTerm) || 
//               NON_TECH_CATEGORIES.containsKey(searchTerm) ||
//               TECH_CATEGORIES.values().stream().anyMatch(category -> category.contains(searchTerm));
//    }
//
//    private double calculateCategoryScore(String jobText, String searchTerm, Set<String> relatedTerms) {
//        double categoryScore = 0.0;
//        int matchCount = 0;
//        
//        for (String relatedTerm : relatedTerms) {
//            if (jobText.contains(relatedTerm)) {
//                matchCount++;
//                categoryScore += 1.0;
//            }
//        }
//        
//        // Bonus for multiple matches in the same category
//        if (matchCount > 3) {
//            categoryScore += CATEGORY_MATCH_BONUS * 2.0;
//        } else if (matchCount > 2) {
//            categoryScore += CATEGORY_MATCH_BONUS * 1.5;
//        } else if (matchCount > 1) {
//            categoryScore += CATEGORY_MATCH_BONUS;
//        } else if (matchCount == 1) {
//            categoryScore += CATEGORY_MATCH_BONUS * 0.5;
//        }
//        
//        return categoryScore;
//    }
//
//    private Set<String> findRelatedTerms(String searchTerm) {
//        Set<String> relatedTerms = new HashSet<>();
//        relatedTerms.add(searchTerm);
//        
//        // Check categories
//        for (Map.Entry<String, Set<String>> entry : TECH_CATEGORIES.entrySet()) {
//            if (entry.getKey().equals(searchTerm) || entry.getValue().contains(searchTerm)) {
//                relatedTerms.addAll(entry.getValue());
//                break;
//            }
//        }
//        
//        for (Map.Entry<String, Set<String>> entry : NON_TECH_CATEGORIES.entrySet()) {
//            if (entry.getKey().equals(searchTerm) || entry.getValue().contains(searchTerm)) {
//                relatedTerms.addAll(entry.getValue());
//                break;
//            }
//        }
//        
//        // Check synonyms
//        for (Map.Entry<String, String> entry : TECH_SYNONYMS.entrySet()) {
//            if (entry.getKey().equals(searchTerm) || entry.getValue().equals(searchTerm)) {
//                relatedTerms.add(entry.getValue());
//                relatedTerms.add(entry.getKey());
//            }
//        }
//        
//        return relatedTerms;
//    }
//
//    private boolean applyBasicFilters(Job job, String experience, String locationFilter, String status,
//                                    String fieldFilter, String jobIdFilter) {
//        // Experience filter
//        if (experience != null && !experience.isEmpty()) {
//            String[] expRange = experience.split("-");
//            Integer minExp = expRange.length > 0 ? Integer.parseInt(expRange[0]) : null;
//            Integer maxExp = expRange.length > 1 ? Integer.parseInt(expRange[1]) : null;
//
//            Integer jobExp = null;
//            try {
//                if (nlpService != null) {
//                    jobExp = nlpService.extractExperienceNumber(job.getExperience());
//                }
//            } catch (Exception e) {
//                String expStr = job.getExperience().replaceAll("[^0-9]", "");
//                if (!expStr.isEmpty()) {
//                    jobExp = Integer.parseInt(expStr);
//                }
//            }
//            
//            if (jobExp == null) return false;
//
//            Integer jobMinExp = jobExp;
//            Integer jobMaxExp = jobExp;
//            String jobExpStr = job.getExperience().toLowerCase();
//            if (jobExpStr.contains("-")) {
//                String[] jobExpRange = jobExpStr.split("-");
//                try {
//                    jobMinExp = Integer.parseInt(jobExpRange[0].replaceAll("[^0-9]", "").trim());
//                    jobMaxExp = Integer.parseInt(jobExpRange[1].replaceAll("[^0-9]", "").trim());
//                } catch (NumberFormatException e) {
//                    // Use single extracted value
//                }
//            }
//
//            boolean matches = false;
//            if (minExp != null && maxExp == null) {
//                matches = jobMinExp <= minExp && jobMaxExp >= minExp;
//            } else if (minExp != null && maxExp != null) {
//                matches = (jobMinExp <= maxExp) && (jobMaxExp >= minExp);
//            }
//
//            if (!matches) return false;
//        }
//
//        // Status filter
//        if (status != null && !status.isEmpty()) {
//            if (!status.equalsIgnoreCase(job.getStatus())) {
//                return false;
//            }
//        }
//
//        // Field filter - only apply if provided
//        if (fieldFilter != null && !fieldFilter.isEmpty()) {
//            if (!matchesFieldFilter(job, fieldFilter)) {
//                return false;
//            }
//        }
//
//        // Job ID filter
//        if (jobIdFilter != null && !jobIdFilter.isEmpty()) {
//            if (!job.getJobId().toLowerCase().contains(jobIdFilter.toLowerCase())) {
//                return false;
//            }
//        }
//
//        // Location filter
//        if (locationFilter != null && !locationFilter.isEmpty()) {
//            try {
//                if (nlpService != null && !nlpService.matchesLocation(job.getLocation(), locationFilter)) {
//                    return false;
//                }
//            } catch (Exception e) {
//                if (!job.getLocation().toLowerCase().contains(locationFilter.toLowerCase())) {
//                    return false;
//                }
//            }
//        }
//
//        return true;
//    }
//
//    private String normalizeSearchTerm(String term) {
//        return term.toLowerCase().trim();
//    }
//}
package com.jobportal.demo.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.jobportal.demo.entity.Job;
import com.jobportal.demo.repository.JobRepository;

@Service
public class JobFilterService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NLPService nlpService;

    private static final double TITLE_SIMILARITY_THRESHOLD = 0.8;
    private static final double DESCRIPTION_SIMILARITY_THRESHOLD = 0.7;
    private static final double RELATED_JOB_THRESHOLD = 0.5;
    private static final double CATEGORY_MATCH_BONUS = 2.0;
    private static final double IT_STRICT_THRESHOLD = 0.8; // Lower threshold for IT-only searches

    // Comprehensive IT Technology Categories
    private static final Map<String, Set<String>> TECH_CATEGORIES = new HashMap<>();
    private static final Map<String, Set<String>> NON_TECH_CATEGORIES = new HashMap<>();

    static {
        // Frontend Technologies
        TECH_CATEGORIES.put("frontend", Set.of(
            "html", "css", "javascript", "js", "typescript", "ts", "react", "reactjs", "react.js", 
            "angular", "angularjs", "vue", "vuejs", "svelte", "jquery", "bootstrap", "tailwind", 
            "tailwindcss", "sass", "scss", "less", "nextjs", "next", "nuxtjs", "nuxt", "gatsby", 
            "webpack", "vite", "parcel", "redux", "graphql", "materialui", "mui", "frontend", 
            "front-end", "ui", "ux", "user interface", "responsive design", "dom", "css3", "html5"
        ));

        // Backend Technologies
        TECH_CATEGORIES.put("backend", Set.of(
            "java", "python", "node", "nodejs", "node.js", "express", "expressjs", "django", "flask", 
            "spring", "springboot", "spring boot", "laravel", "rails", "ruby on rails", "asp.net", 
            "aspnet", "dotnet", ".net", "php", "c#", "csharp", "go", "golang", "rust", "kotlin", 
            "scala", "nestjs", "micronaut", "quarkus", "hibernate", "jpa", "backend", "back-end", 
            "server", "api", "rest", "restful", "microservices", "web services", "servlet", "jsp",
            "fastapi", "gin", "fiber", "actix", "symfony", "codeigniter"
        ));

        // Fullstack
        TECH_CATEGORIES.put("fullstack", Set.of(
            "fullstack", "full stack", "full-stack", "mern", "mean", "mevn", "lamp", "jamstack", "pern"
        ));

        // DevOps & Cloud
        TECH_CATEGORIES.put("devops", Set.of(
            "aws", "amazon web services", "azure", "microsoft azure", "gcp", "google cloud", 
            "google cloud platform", "docker", "kubernetes", "k8s", "terraform", "ansible", 
            "jenkins", "gitlab", "github actions", "prometheus", "grafana", "istio", "helm", 
            "argo", "spinnaker", "ci/cd", "cicd", "devops", "deployment", "infrastructure", 
            "monitoring", "automation", "nginx", "apache", "linux", "unix", "shell", "bash",
            "chef", "puppet", "vagrant", "consul", "vault", "nomad"
        ));

        // Mobile Development
        TECH_CATEGORIES.put("mobile", Set.of(
            "android", "ios", "flutter", "react native", "rn", "kotlin", "swift", "xamarin", 
            "ionic", "cordova", "phonegap", "mobile", "mobile dev", "mobile development", 
            "app development", "mobile app", "android studio", "xcode", "objective-c"
        ));

        // Database Technologies
        TECH_CATEGORIES.put("database", Set.of(
            "sql", "mysql", "postgresql", "postgres", "oracle", "mongodb", "mongo", "redis", 
            "elasticsearch", "es", "dynamodb", "firebase", "cassandra", "neo4j", "sqlite", 
            "mariadb", "couchdb", "database", "db", "dbms", "data", "nosql", "rdbms",
            "bigquery", "snowflake", "redshift", "clickhouse", "influxdb"
        ));

        // Programming Languages
        TECH_CATEGORIES.put("programming", Set.of(
            "java", "python", "javascript", "typescript", "c++", "cpp", "c", "c#", "csharp",
            "php", "ruby", "go", "golang", "rust", "kotlin", "swift", "scala", "r", "matlab",
            "perl", "lua", "dart", "elixir", "clojure", "haskell", "erlang", "f#", "vb.net"
        ));

        // Testing & QA
        TECH_CATEGORIES.put("testing", Set.of(
            "selenium", "junit", "testng", "mockito", "jest", "cypress", "playwright", "puppeteer",
            "postman", "insomnia", "jmeter", "loadrunner", "cucumber", "mocha", "chai", "jasmine",
            "testing", "qa", "quality assurance", "automation testing", "manual testing", "tdd",
            "bdd", "unit testing", "integration testing", "e2e testing", "performance testing"
        ));

        // Data Science & AI
        TECH_CATEGORIES.put("datascience", Set.of(
            "python", "r", "pandas", "numpy", "scipy", "sklearn", "tensorflow", "pytorch", "keras",
            "opencv", "matplotlib", "seaborn", "jupyter", "anaconda", "spark", "hadoop", "kafka",
            "airflow", "mlflow", "kubeflow", "data science", "machine learning", "deep learning",
            "artificial intelligence", "ai", "ml", "dl", "nlp", "computer vision", "statistics"
        ));

        // Non-IT Categories
        NON_TECH_CATEGORIES.put("sales", Set.of(
            "sales", "marketing", "digital marketing", "seo", "social media", "content marketing",
            "email marketing", "ppc", "google ads", "facebook ads", "business development",
            "account executive", "sales executive", "marketing executive", "lead generation",
            "crm", "salesforce", "hubspot"
        ));

        NON_TECH_CATEGORIES.put("customer_service", Set.of(
            "customer support", "customer service", "call center", "bpo", "telecalling", 
            "helpdesk", "technical support", "client service", "customer care", "support",
            "chat support", "phone support", "email support"
        ));

        NON_TECH_CATEGORIES.put("hr", Set.of(
            "hr", "human resources", "recruitment", "talent acquisition", "hr executive", 
            "recruiter", "hr manager", "staffing", "interviewing", "onboarding", "payroll",
            "employee relations", "performance management", "training", "learning development"
        ));

        NON_TECH_CATEGORIES.put("accounting", Set.of(
            "accounting", "finance", "accounts", "ca", "cpa", "bookkeeping", "taxation", 
            "audit", "financial analysis", "accounts payable", "accounts receivable", "tally",
            "quickbooks", "excel", "financial planning", "budgeting", "cost accounting"
        ));

        NON_TECH_CATEGORIES.put("operations", Set.of(
            "operations", "logistics", "supply chain", "warehouse", "inventory", "procurement",
            "vendor management", "facility management", "admin", "administrative", "office management",
            "receptionist", "data entry", "filing", "documentation"
        ));
    }

    // Enhanced technology synonyms
    private static final Map<String, String> TECH_SYNONYMS = Map.ofEntries(
        // Frontend
        Map.entry("rea", "react"), Map.entry("reactjs", "react"), Map.entry("react.js", "react"),
        Map.entry("rct", "react"), Map.entry("js", "javascript"), Map.entry("es6", "javascript"),
        Map.entry("ts", "typescript"), Map.entry("ng", "angular"), Map.entry("angularjs", "angular"),
        Map.entry("vjs", "vue"), Map.entry("vuejs", "vue"), Map.entry("sveltejs", "svelte"),
        Map.entry("jq", "jquery"), Map.entry("bs", "bootstrap"), Map.entry("tw", "tailwind"),
        Map.entry("scss", "sass"), Map.entry("nextjs", "next"), Map.entry("nuxtjs", "nuxt"),
        
        // Backend  
        Map.entry("nodejs", "node"), Map.entry("node.js", "node"), Map.entry("expressjs", "express"),
        Map.entry("springboot", "spring"), Map.entry("sboot", "spring"), Map.entry("dj", "django"),
        Map.entry("fl", "flask"), Map.entry("aspnet", "asp.net"), Map.entry("dotnet", ".net"),
        Map.entry("csharp", "c#"), Map.entry("goln", "go"), Map.entry("golang", "go"),
        
        // Databases
        Map.entry("postgresql", "postgres"), Map.entry("psql", "postgres"), Map.entry("pg", "postgres"),
        Map.entry("mongo", "mongodb"), Map.entry("mdb", "mongodb"), Map.entry("es", "elasticsearch"),
        Map.entry("dynamo", "dynamodb"), Map.entry("sqlite", "sql"), Map.entry("msql", "mysql"),
        
        // DevOps
        Map.entry("k8s", "kubernetes"), Map.entry("kube", "kubernetes"), Map.entry("tf", "terraform"),
        Map.entry("ans", "ansible"), Map.entry("jenk", "jenkins"), Map.entry("cicd", "ci/cd"),
        
        // Mobile
        Map.entry("rn", "react native"), Map.entry("reactnative", "react native"),
        Map.entry("flut", "flutter"), Map.entry("swft", "swift"),
        
        // Cloud
        Map.entry("aws", "amazon web services"), Map.entry("gcp", "google cloud"),
        Map.entry("gcloud", "google cloud")
    );

    // Main filtering method with enhanced IT-only logic
    public Page<Job> filterJobsWithNLP(String searchTerm, String experience, String locationFilter, 
                                     String status, String fieldFilter, String jobIdFilter, Pageable pageable) {
        
        // Determine if this should be an IT-only search
        boolean isITFieldRequest = isITFieldRequest(fieldFilter);
        boolean isITTechnologySearch = isITTechnologySearch(searchTerm);
        boolean strictITMode = isITFieldRequest || isITTechnologySearch;
        
        System.out.println("Search Term: " + searchTerm);
        System.out.println("Is IT Field Request: " + isITFieldRequest);
        System.out.println("Is IT Technology Search: " + isITTechnologySearch);
        System.out.println("Strict IT Mode: " + strictITMode);
        
        // Get all jobs that match basic filters
        List<Job> baseFilteredJobs = jobRepository.findAll().stream()
                .filter(job -> applyBasicFilters(job, experience, locationFilter, status, fieldFilter, jobIdFilter))
                .collect(Collectors.toList());

        System.out.println("Base filtered jobs count: " + baseFilteredJobs.size());

        List<Job> finalFilteredJobs;

        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            // No search term - apply field filter only
            if (strictITMode) {
                finalFilteredJobs = baseFilteredJobs.stream()
                        .filter(this::isITJob)
                        .collect(Collectors.toList());
            } else {
                finalFilteredJobs = baseFilteredJobs;
            }
        } else {
            String cleanSearchTerm = normalizeSearchTerm(searchTerm);
            Set<String> relatedTerms = findRelatedTerms(cleanSearchTerm);
            
            // Score all jobs
            Map<Job, Double> scoredJobs = new HashMap<>();
            double threshold = strictITMode ? IT_STRICT_THRESHOLD : RELATED_JOB_THRESHOLD;
            
            for (Job job : baseFilteredJobs) {
                // In strict IT mode, only consider IT jobs
                if (strictITMode && !isITJob(job)) {
                    continue;
                }
                
                double score = calculateRelevanceScore(job, cleanSearchTerm, relatedTerms);
                if (score >= threshold) {
                    scoredJobs.put(job, score);
                }
            }

            // Sort by score descending
            finalFilteredJobs = scoredJobs.entrySet().stream()
                    .sorted(Map.Entry.<Job, Double>comparingByValue().reversed())
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());
        }

        System.out.println("Final filtered jobs count: " + finalFilteredJobs.size());

        // Apply pagination
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), finalFilteredJobs.size());
        
        List<Job> pageContent = finalFilteredJobs.subList(start, end);
        
        return new PageImpl<>(pageContent, pageable, finalFilteredJobs.size());
    }

    // Backward compatibility method
    public List<Job> filterJobsWithNLP(String searchTerm, String experience, String locationFilter, 
                                     String status, String fieldFilter, String jobIdFilter) {
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
        return filterJobsWithNLP(searchTerm, experience, locationFilter, status, fieldFilter, jobIdFilter, pageable).getContent();
    }

    // Enhanced IT field detection
    private boolean isITFieldRequest(String fieldFilter) {
        if (fieldFilter == null || fieldFilter.trim().isEmpty()) {
            return false;
        }
        
        String field = fieldFilter.toLowerCase().trim();
        return field.equals("it") || 
               field.equals("information technology") || 
               field.equals("technology") || 
               field.equals("software") || 
               field.equals("development") || 
               field.equals("programming") ||
               field.equals("engineering") ||
               field.contains("tech") ||
               field.contains("developer") ||
               field.contains("software");
    }

    // Enhanced IT technology search detection
    private boolean isITTechnologySearch(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return false;
        }
        
        String normalizedTerm = normalizeSearchTerm(searchTerm);
        
        // Direct category match
        if (TECH_CATEGORIES.containsKey(normalizedTerm)) {
            System.out.println("Found direct category match: " + normalizedTerm);
            return true;
        }
        
        // Check if term exists in any IT technology category
        for (Map.Entry<String, Set<String>> entry : TECH_CATEGORIES.entrySet()) {
            if (entry.getValue().contains(normalizedTerm)) {
                System.out.println("Found in category " + entry.getKey() + ": " + normalizedTerm);
                return true;
            }
        }
        
        // Check synonyms
        if (TECH_SYNONYMS.containsKey(normalizedTerm) || TECH_SYNONYMS.containsValue(normalizedTerm)) {
            System.out.println("Found in synonyms: " + normalizedTerm);
            return true;
        }
        
        // Partial matching for technology terms (minimum 3 characters)
        if (normalizedTerm.length() >= 3) {
            for (Set<String> techSet : TECH_CATEGORIES.values()) {
                for (String tech : techSet) {
                    if (tech.contains(normalizedTerm) || normalizedTerm.contains(tech)) {
                        System.out.println("Found partial match: " + normalizedTerm + " with " + tech);
                        return true;
                    }
                }
            }
            
            // Check partial matches in synonyms
            for (String tech : TECH_SYNONYMS.keySet()) {
                if (tech.contains(normalizedTerm) || normalizedTerm.contains(tech)) {
                    System.out.println("Found partial synonym match: " + normalizedTerm + " with " + tech);
                    return true;
                }
            }
        }
        
        return false;
    }

    // Enhanced IT job detection
    private boolean isITJob(Job job) {
        String title = job.getTitle().toLowerCase();
        String description = job.getDescription().toLowerCase();
        String jobText = title + " " + description;
        String field = job.getField() != null ? job.getField().toLowerCase() : "";
        
        // Check field first
        if (field.contains("it") || field.contains("technology") || field.contains("software") || 
            field.contains("development") || field.contains("engineering") || field.contains("tech") ||
            field.contains("programmer") || field.contains("developer")) {
            return true;
        }
        
        // Check for IT technologies in job content
        for (Set<String> techSet : TECH_CATEGORIES.values()) {
            for (String tech : techSet) {
                if (jobText.contains(tech)) {
                    return true;
                }
            }
        }
        
        // Check tech synonyms
        for (Map.Entry<String, String> entry : TECH_SYNONYMS.entrySet()) {
            if (jobText.contains(entry.getKey()) || jobText.contains(entry.getValue())) {
                return true;
            }
        }
        
        // Common IT job titles and keywords
        String[] itKeywords = {
            "developer", "programmer", "software", "engineer", "architect", "devops", 
            "sysadmin", "system administrator", "technical", "tech", "coding", "programming",
            "web developer", "app developer", "data scientist", "machine learning", "ai",
            "cloud", "database", "network", "security", "qa", "tester", "analyst",
            "frontend", "backend", "fullstack", "full stack", "full-stack", "ui/ux",
            "scrum master", "product owner", "technical lead", "tech lead", "solution architect",
            "data engineer", "ml engineer", "cyber security", "information security",
            "business analyst", "system analyst", "technical writer", "automation engineer",
            "mobile developer", "ios developer", "android developer", "game developer",
            "blockchain", "cryptocurrency", "fintech", "edtech", "saas", "paas", "iaas"
        };
        
        for (String keyword : itKeywords) {
            if (title.contains(keyword) || description.contains(keyword)) {
                return true;
            }
        }
        
        return false;
    }

    // Enhanced relevance scoring
    private double calculateRelevanceScore(Job job, String searchTerm, Set<String> relatedTerms) {
        double score = 0.0;
        String title = job.getTitle().toLowerCase();
        String company = job.getCompany().toLowerCase();
        String description = job.getDescription().toLowerCase();
        String field = job.getField() != null ? job.getField().toLowerCase() : "";
        String jobText = title + " " + description + " " + field;
        
        // 1. Exact matches (highest priority)
        if (title.contains(searchTerm)) score += 3.0;
        if (company.contains(searchTerm)) score += 2.0;
        if (field.contains(searchTerm)) score += 2.5;
        
        // 2. Category-based matching
        if (isCategorySearch(searchTerm)) {
            score += calculateCategoryScore(jobText, searchTerm, relatedTerms);
        }
        
        // 3. Partial word matches
        String[] terms = searchTerm.split("\\s+");
        for (String term : terms) {
            if (title.contains(term)) score += 1.5;
            if (company.contains(term)) score += 1.0;
            if (field.contains(term)) score += 1.2;
            if (description.contains(term)) score += 0.5;
        }
        
        // 4. Related terms matching
        for (String relatedTerm : relatedTerms) {
            if (jobText.contains(relatedTerm)) {
                score += 1.0;
            }
        }
        
        // 5. Technology synonym matching
        String normalizedTerm = TECH_SYNONYMS.getOrDefault(searchTerm, searchTerm);
        if (!normalizedTerm.equals(searchTerm) && jobText.contains(normalizedTerm)) {
            score += 1.2;
        }
        
        // 6. NLP similarity (if available)
        try {
            if (nlpService != null) {
                score += nlpService.calculateSimilarity(searchTerm, title) * 1.0;
                score += nlpService.calculateSimilarity(searchTerm, description) * 0.6;
            }
        } catch (Exception e) {
            // Continue without NLP
        }
        
        return score;
    }

    private boolean isCategorySearch(String searchTerm) {
        return TECH_CATEGORIES.containsKey(searchTerm) || 
               NON_TECH_CATEGORIES.containsKey(searchTerm) ||
               TECH_CATEGORIES.values().stream().anyMatch(category -> category.contains(searchTerm));
    }

    private double calculateCategoryScore(String jobText, String searchTerm, Set<String> relatedTerms) {
        double categoryScore = 0.0;
        int matchCount = 0;
        
        for (String relatedTerm : relatedTerms) {
            if (jobText.contains(relatedTerm)) {
                matchCount++;
                categoryScore += 0.8;
            }
        }
        
        // Bonus for multiple matches in the same category
        if (matchCount > 2) {
            categoryScore += CATEGORY_MATCH_BONUS * 1.5;
        } else if (matchCount > 1) {
            categoryScore += CATEGORY_MATCH_BONUS;
        } else if (matchCount == 1) {
            categoryScore += CATEGORY_MATCH_BONUS * 0.5;
        }
        
        return categoryScore;
    }

    private Set<String> findRelatedTerms(String searchTerm) {
        Set<String> relatedTerms = new HashSet<>();
        relatedTerms.add(searchTerm);
        
        // Check categories
        for (Map.Entry<String, Set<String>> entry : TECH_CATEGORIES.entrySet()) {
            if (entry.getKey().equals(searchTerm) || entry.getValue().contains(searchTerm)) {
                relatedTerms.addAll(entry.getValue());
                break;
            }
        }
        
        for (Map.Entry<String, Set<String>> entry : NON_TECH_CATEGORIES.entrySet()) {
            if (entry.getKey().equals(searchTerm) || entry.getValue().contains(searchTerm)) {
                relatedTerms.addAll(entry.getValue());
                break;
            }
        }
        
        // Check synonyms
        for (Map.Entry<String, String> entry : TECH_SYNONYMS.entrySet()) {
            if (entry.getKey().equals(searchTerm) || entry.getValue().equals(searchTerm)) {
                relatedTerms.add(entry.getValue());
                relatedTerms.add(entry.getKey());
            }
        }
        
        return relatedTerms;
    }

    private boolean applyBasicFilters(Job job, String experience, String locationFilter, String status,
                                    String fieldFilter, String jobIdFilter) {
        // Experience filter
        if (experience != null && !experience.isEmpty()) {
            String[] expRange = experience.split("-");
            Integer minExp = expRange.length > 0 ? Integer.parseInt(expRange[0]) : null;
            Integer maxExp = expRange.length > 1 ? Integer.parseInt(expRange[1]) : null;

            Integer jobExp = null;
            try {
                if (nlpService != null) {
                    jobExp = nlpService.extractExperienceNumber(job.getExperience());
                }
            } catch (Exception e) {
                String expStr = job.getExperience().replaceAll("[^0-9]", "");
                if (!expStr.isEmpty()) {
                    jobExp = Integer.parseInt(expStr);
                }
            }
            
            if (jobExp == null) return false;

            Integer jobMinExp = jobExp;
            Integer jobMaxExp = jobExp;
            String jobExpStr = job.getExperience().toLowerCase();
            if (jobExpStr.contains("-")) {
                String[] jobExpRange = jobExpStr.split("-");
                try {
                    jobMinExp = Integer.parseInt(jobExpRange[0].replaceAll("[^0-9]", "").trim());
                    jobMaxExp = Integer.parseInt(jobExpRange[1].replaceAll("[^0-9]", "").trim());
                } catch (NumberFormatException e) {
                    // Use single extracted value
                }
            }

            boolean matches = false;
            if (minExp != null && maxExp == null) {
                matches = jobMinExp <= minExp && jobMaxExp >= minExp;
            } else if (minExp != null && maxExp != null) {
                matches = (jobMinExp <= maxExp) && (jobMaxExp >= minExp);
            }

            if (!matches) return false;
        }

        // Status filter
        if (status != null && !status.isEmpty()) {
            if (!status.equalsIgnoreCase(job.getStatus())) {
                return false;
            }
        }

        // Field filter - DO NOT apply IT filtering here if there's a search term
        // Let the main logic handle IT filtering
        if (fieldFilter != null && !fieldFilter.isEmpty()) {
            String jobField = job.getField() != null ? job.getField().toLowerCase() : "";
            String filterField = fieldFilter.toLowerCase();
            
            if (!filterField.equalsIgnoreCase(jobField)) {
                return false;
            }
        }

        // Job ID filter
        if (jobIdFilter != null && !jobIdFilter.isEmpty()) {
            if (!job.getJobId().toLowerCase().contains(jobIdFilter.toLowerCase())) {
                return false;
            }
        }

        // Location filter
        if (locationFilter != null && !locationFilter.isEmpty()) {
            try {
                if (nlpService != null && !nlpService.matchesLocation(job.getLocation(), locationFilter)) {
                    return false;
                }
            } catch (Exception e) {
                if (!job.getLocation().toLowerCase().contains(locationFilter.toLowerCase())) {
                    return false;
                }
            }
        }

        return true;
    }

    private String normalizeSearchTerm(String term) {
        return term.toLowerCase().trim();
    }
}